import { sendEvent } from 'felles/amplitude';
import { Jobbønske, JobbønskeSted } from 'felles/domene/kandidat/Jobbprofil';
import { useEffect, useState } from 'react';
import {
    KandidatStillingssøkDTO,
    useKandidatStillingssøk,
    GeografiØnske,
} from '../../../api/kandidat-søk-api/kandidatStillingssøk';
import { Status } from '../filter/om-annonsen/Annonsestatus';
import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
import useNavigering from '../useNavigering';
import { QueryParam } from '../utils/urlUtils';
import { finn2024KoderForGamleKoder } from 'felles/MappingSted';

interface IuseKandidatStillingssøk {
    kandidatnr: string;
}

interface IUseKandidatStillingssøkRetur {
    kandidatStillingssøk: KandidatStillingssøkDTO | null;
    hentetGeografiFraBosted: boolean;
    manglerØnsketYrke: boolean;
    isLoading: boolean;
    error: any;
}

export const useKandidatStillingssøkData = ({
    kandidatnr,
}: IuseKandidatStillingssøk): IUseKandidatStillingssøkRetur => {
    const { searchParams, navigate } = useNavigering();
    const [hentetGeografiFraBosted, setHentetGeografiFraBosted] = useState<boolean>(false);
    const [manglerØnsketYrke, setManglerØnsketYrke] = useState<boolean>(false);

    const swrHook = useKandidatStillingssøk({ kandidatnr });

    const kandidatStillingssøk = swrHook.data;
    useEffect(() => {
        if (kandidatStillingssøk) {
            const brukKandidatkriterier =
                searchParams.get(QueryParam.BrukKriterierFraKandidat) === 'true';

            const { geografiJobbonsker, yrkeJobbonskerObj, kommunenummerstring, kommuneNavn } =
                kandidatStillingssøk;

            const konverterteGeografikoder = konverterStederTil2024koder(
                geografiJobbonsker,
                kommunenummerstring,
                kommuneNavn,
                geografiJobbonsker.length === 0
            );
            setHentetGeografiFraBosted(geografiJobbonsker.length === 0);

            let fylker: (string | undefined)[] = hentFylkerFraJobbønsker(konverterteGeografikoder);
            let kommuner = hentKommunerFraJobbønsker(konverterteGeografikoder);
            const yrkesønsker = hentYrkerFraJobbønsker(yrkeJobbonskerObj);

            if (yrkesønsker.length === 0) {
                setManglerØnsketYrke(true);
            }

            if (brukKandidatkriterier) {
                const søk = new URLSearchParams();

                if (fylker.length > 0) søk.set(QueryParam.Fylker, String(fylker));
                if (kommuner.length > 0) søk.set(QueryParam.Kommuner, String(kommuner));
                if (yrkesønsker.length > 0) søk.set(QueryParam.Tekst, String(yrkesønsker));

                søk.set(QueryParam.Statuser, Status.Publisert);
                søk.set(QueryParam.Publisert, Publisert.Intern);

                sendEvent('stillingssøk', 'kontekst_av_kandidat', {
                    antallFylker: fylker.length,
                    antallKommuner: kommuner.length,
                    antallYrkesønsker: yrkesønsker.length,
                });

                navigate({ search: søk.toString() }, { replace: true });
            }
        }
    }, [kandidatnr, navigate, searchParams, swrHook, kandidatStillingssøk]);

    return { ...swrHook, hentetGeografiFraBosted, manglerØnsketYrke, kandidatStillingssøk };
};

const hentFylkeskode = (geografiKode: string) => {
    const fylkesnummerFraKandidat = geografiKode.split('.')[0].substring(2);

    if (fylkesnummerFraKandidat.match(/^\d+$/)) {
        return fylkesnummerFraKandidat;
    }
};

const hentFylkerFraJobbønsker = (geografijobbønsker: JobbønskeSted[]): string[] => {
    return geografijobbønsker
        .map((jobbønske) => jobbønske.geografiKode)
        .map((geografiKode) => hentFylkeskode(geografiKode))
        .filter((fylke) => fylke !== undefined) as string[];
};

const hentKommunerFraJobbønsker = (geografijobbønsker: JobbønskeSted[]): string[] => {
    return geografijobbønsker
        .filter((jobbønske) => jobbønske.geografiKode.includes('.'))
        .map((jobbønske) => {
            const kommune = jobbønske.geografiKode.split('.')[1];
            return kommune;
        });
};

const hentYrkerFraJobbønsker = (yrkesønsker: Jobbønske[]): string[] => {
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

const konverterStederTil2024koder = (
    geografiJobbonsker: GeografiØnske[],
    kommunenummerstring: string,
    kommuneNavn: string,
    henterGeografiFraBosted: boolean
): GeografiØnske[] => {
    const geografiJobbønskerFraKandidat: string[] = geografiJobbonsker.map(
        (geografiJobbonske: GeografiØnske) => {
            return `${geografiJobbonske.geografiKodeTekst}.${geografiJobbonske.geografiKode}`;
        }
    );

    if (henterGeografiFraBosted) {
        const fylkesKode =
            kommunenummerstring && kommunenummerstring.length > 2
                ? kommunenummerstring.substring(0, 2)
                : '';
        const sted = `${kommuneNavn}.NO${fylkesKode}.${kommunenummerstring}`;
        geografiJobbønskerFraKandidat.push(sted);
    }

    const nyeGeografiJobbonskerPåKandidatformat: string[] = finn2024KoderForGamleKoder(
        geografiJobbønskerFraKandidat
    );

    return nyeGeografiJobbonskerPåKandidatformat.map((kode) => {
        const deler = kode.split('.');
        return {
            geografiKodeTekst: deler[0],
            geografiKode: deler.slice(1).join('.'),
        };
    });
};
