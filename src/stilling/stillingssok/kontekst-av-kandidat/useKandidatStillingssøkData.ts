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
import { Sted, getNummerFraSted, stedmappingFraGammeltNummer } from 'felles/mappingSted2';

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

            console.log('geografiJobbonsker', geografiJobbonsker);

            const konverterteGeografikoder = konverterStederTil2024koder(
                geografiJobbonsker,
                kommunenummerstring,
                kommuneNavn,
                geografiJobbonsker.length === 0
            );
            setHentetGeografiFraBosted(geografiJobbonsker.length === 0);
            console.log('geografiJobbonsker2', geografiJobbonsker);

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

const hentFylkerFraJobbønsker = (geografijobbønsker: Sted[]): string[] => {
    return geografijobbønsker
        .filter((jobbønske) => jobbønske.nummer.length === 2)
        .map((jobbønske) => jobbønske.nummer);
};

const hentKommunerFraJobbønsker = (geografijobbønsker: Sted[]): string[] => {
    return geografijobbønsker
        .filter((jobbønske) => jobbønske.nummer.length === 4)
        .map((jobbønske) => jobbønske.nummer);
};

const hentYrkerFraJobbønsker = (yrkesønsker: Jobbønske[]): string[] => {
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

const konverterStederTil2024koder = (
    geografiJobbonsker: GeografiØnske[],
    kommunenummerstring: string,
    kommuneNavn: string,
    henterGeografiFraBosted: boolean
): Sted[] => {
    console.log(
        'kommunenummerstring',
        kommunenummerstring,
        'kommuneNavn',
        kommuneNavn,
        'henterGeografiFraBosted',
        henterGeografiFraBosted,
        'geografiJobbonsker',
        geografiJobbonsker
    );
    let geografiJobbønskerFraKandidat: Sted[] = geografiJobbonsker.map((g) => {
        return {
            navn: g.geografiKodeTekst,
            nummer: getNummerFraSted(g.geografiKode),
        };
    });
    console.log('geografiJobbønskerFraKandidat', geografiJobbønskerFraKandidat);

    if (henterGeografiFraBosted) {
        geografiJobbønskerFraKandidat.push({
            navn: kommuneNavn,
            nummer: kommunenummerstring,
        });
    }
    console.log('geografiJobbønskerFraKandidat2', geografiJobbønskerFraKandidat);
    const konverterteGeografiJobbonsker: Sted[] = geografiJobbønskerFraKandidat.map((g) => {
        return stedmappingFraGammeltNummer.get(g.nummer) || g;
    });
    console.log('konverterteGeografiJobbonsker', konverterteGeografiJobbonsker);

    const fylkesKoder = konverterteGeografiJobbonsker
        .filter(({ nummer }) => nummer.length === 2)
        .map(({ nummer }) => nummer);
    console.log('fylkesKoder', fylkesKoder);

    const ret = konverterteGeografiJobbonsker.filter(
        ({ nummer }) =>
            !fylkesKoder.some(
                (fylkesKode) => nummer.startsWith(fylkesKode) && nummer !== fylkesKode
            ) && nummer.length < 5
    );
    console.log('ret', ret);
    return ret;
};

/*const konverterStederTil2024koder = (
    geografiJobbonsker: GeografiØnske[],
    kommunenummerstring: string,
    kommuneNavn: string,
    henterGeografiFraBosted: boolean
): GeografiØnske[] => {
    let geografiJobbønskerFraKandidat = geografiJobbonsker.map(
        ({ geografiKodeTekst, geografiKode }) => `${geografiKodeTekst}.${geografiKode}`
    );

    if (henterGeografiFraBosted) {
        const fylkesKode =
            kommunenummerstring.length >= 2 ? kommunenummerstring.substring(0, 2) : '';
        geografiJobbønskerFraKandidat.push(`${kommuneNavn}.NO${fylkesKode}.${kommunenummerstring}`);
    }

    // Konverterer til nye koder først
    const konverterteGeografiJobbonsker = finn2024KoderForGamleKoder(
        geografiJobbønskerFraKandidat
    ).map((kode) => {
        const deler = kode.split('.');
        return {
            geografiKodeTekst: deler[0],
            geografiKode: deler.slice(1).join('.'),
        };
    });

    const fylkesKoder = konverterteGeografiJobbonsker
        .filter(({ geografiKode }) => geografiKode.length === 4 && !geografiKode.includes('.'))
        .map(({ geografiKode }) => geografiKode);

    return konverterteGeografiJobbonsker.filter(
        ({ geografiKode }) =>
            !fylkesKoder.some(
                (fylkesKode) => geografiKode.startsWith(fylkesKode) && geografiKode !== fylkesKode
            ) && geografiKode.length <= 9
    );
};*/
