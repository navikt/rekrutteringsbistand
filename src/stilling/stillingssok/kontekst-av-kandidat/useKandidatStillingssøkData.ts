import { sendEvent } from 'felles/amplitude';
import { Jobbønske } from 'felles/domene/kandidat/Jobbprofil';
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
import { getNummerFraSted, stedmappingFraGammeltNummer } from 'felles/mappingSted2';

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

            const { geografiJobbonsker, yrkeJobbonskerObj, kommunenummerstring } =
                kandidatStillingssøk;

            const konverterteGeografikoder = konverterStederTil2024koder(
                geografiJobbonsker,
                kommunenummerstring,
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

const hentFylkerFraJobbønsker = (geografijobbønskenummer: string[]): string[] => {
    return Array.from(
        new Set(
            geografijobbønskenummer
                .filter((n) => n.length === 2 || n.length === 4)
                .map((n) => (n.length === 4 ? n.substring(0, 2) : n))
        )
    );
};

const hentKommunerFraJobbønsker = (geografijobbønskenummer: string[]): string[] => {
    return geografijobbønskenummer.filter((n) => n.length === 4);
};

const hentYrkerFraJobbønsker = (yrkesønsker: Jobbønske[]): string[] => {
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

const konverterStederTil2024koder = (
    geografiJobbonsker: GeografiØnske[],
    kommunenummerstring: string,
    henterGeografiFraBosted: boolean
): string[] => {
    const geografiJobbonskerFraKandidat: string[] = geografiJobbonsker.map((g) =>
        getNummerFraSted(g.geografiKode)
    );

    const konverterteGeografiJobbonsker: string[] = (
        henterGeografiFraBosted
            ? [...geografiJobbonskerFraKandidat, kommunenummerstring]
            : geografiJobbonskerFraKandidat
    ).map((g) => {
        const mappedValue = stedmappingFraGammeltNummer.get(g)?.nummer || g;
        return mappedValue.length > 4 ? mappedValue.substring(0, 4) : mappedValue;
    });

    const fylkesKoder = konverterteGeografiJobbonsker.filter((nummer) => nummer.length === 2);

    return konverterteGeografiJobbonsker.filter(
        (nummer) =>
            !fylkesKoder.some(
                (fylkesKode) => nummer.startsWith(fylkesKode) && nummer !== fylkesKode
            ) && nummer.length > 0
    );
};
