import { sendEvent } from 'felles/amplitude';
import { Jobbønske, JobbønskeSted } from 'felles/domene/kandidat/Jobbprofil';
import useKandidat from 'felles/komponenter/kandidatbanner/useKandidat';
import { Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import fylkerOgKommuner from '../filter/geografi/fylkerOgKommuner.json';
import { brukNyttFylkesnummer } from '../filter/geografi/regionsreformen';
import { Status } from '../filter/om-annonsen/Annonsestatus';
import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
import useNavigering from '../useNavigering';
import { QueryParam } from '../utils/urlUtils';

const useKandidatStillingssøk = (kandidatnr: string) => {
    const { searchParams, navigate } = useNavigering();
    const [hentetGeografiFraBosted, setHentetGeografiFraBosted] = useState<boolean>(false);
    const [manglerØnsketYrke, setManglerØnsketYrke] = useState<boolean>(false);

    const kandidat = useKandidat(kandidatnr);

    useEffect(() => {
        if (kandidat.kind === Nettstatus.Suksess) {
            const brukKandidatkriterier =
                searchParams.get(QueryParam.BrukKriterierFraKandidat) === 'true';

            const { geografiJobbonsker, yrkeJobbonskerObj, kommunenummerstring, kommuneNavn } =
                kandidat.data;

            let fylker = hentFylkerFraJobbønsker(geografiJobbonsker);
            let kommuner = hentKommunerFraJobbønsker(geografiJobbonsker);
            const yrkesønsker = hentYrkerFraJobbønsker(yrkeJobbonskerObj);

            if (yrkesønsker.length === 0) {
                setManglerØnsketYrke(true);
            }

            if (fylker.length === 0 && kommuner.length === 0) {
                fylker = hentFylkeFraBosted(kommunenummerstring);
                kommuner = hentKommuneFraBosted(kommunenummerstring, kommuneNavn);

                setHentetGeografiFraBosted(true);
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
    }, [kandidatnr, navigate, kandidat, searchParams]);

    return { kandidat, hentetGeografiFraBosted, manglerØnsketYrke };
};

const hentFylkestekstFraGeografiKode = (geografiKode: string) => {
    const fylkesnummerFraKandidat = geografiKode.split('.')[0].substring(2);

    return fylkerOgKommuner.find((fylke) => {
        return fylke.fylkesnummer === brukNyttFylkesnummer(fylkesnummerFraKandidat);
    })?.fylkesnavn;
};

const hentFylkerFraJobbønsker = (geografijobbønsker: JobbønskeSted[]): string[] => {
    return geografijobbønsker
        .map((jobbønske) => jobbønske.geografiKode)
        .map((geografiKode) => hentFylkestekstFraGeografiKode(geografiKode))
        .filter((fylke) => fylke !== undefined) as string[];
};

const hentKommunerFraJobbønsker = (geografijobbønsker: JobbønskeSted[]): string[] => {
    return geografijobbønsker
        .filter((jobbønske) => jobbønske.geografiKode.includes('.'))
        .map((jobbønske) => {
            const kommunetekst = jobbønske.geografiKodeTekst;
            const fylkestekst = hentFylkestekstFraGeografiKode(jobbønske.geografiKode);

            return `${fylkestekst}.${kommunetekst}`;
        });
};

const hentFylkeFraBosted = (kommunenummer: string) => {
    if (kommunenummer) {
        const fylkeskode = kommunenummer.substring(0, 2);
        return [hentFylkestekstFraGeografiKode(`NO${fylkeskode}`)];
    }

    return [];
};

const hentKommuneFraBosted = (kommunenummer: string, kommunenavn: string) => {
    const fylkeskode = kommunenummer.substring(0, 2);
    const fylkestekst = hentFylkestekstFraGeografiKode(`NO${fylkeskode}`);

    return [`${fylkestekst}.${kommunenavn}`];
};

const hentYrkerFraJobbønsker = (yrkesønsker: Jobbønske[]): string[] => {
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

export default useKandidatStillingssøk;
