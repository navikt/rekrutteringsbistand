import { sendEvent } from 'felles/amplitude';
import { Jobbønske, JobbønskeSted } from 'felles/domene/kandidat/Jobbprofil';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { useEffect } from 'react';
import fylkerOgKommuner from '../filter/geografi/fylkerOgKommuner.json';
import { brukNyttFylkesnummer } from '../filter/geografi/regionsreformen';
import { Status } from '../filter/om-annonsen/Annonsestatus';
import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
import useNavigering from '../useNavigering';
import { QueryParam } from '../utils/urlUtils';
import useKandidat, { fodselsnrTerm } from 'felles/komponenter/banner/useKandidat';

const useKandidatStillingssøk = (fnr: string) => {
    const { searchParams, navigate } = useNavigering();

    const { kandidat, feilmelding } = useKandidat(fodselsnrTerm(fnr));

    useEffect(() => {
        if (kandidat) {
            console.log('searchParams', searchParams);
            const brukKandidatkriterier = searchParams.get(QueryParam.Kandidatkriterier) !== null;
            const { geografiJobbonsker, yrkeJobbonskerObj } = kandidat;
            const brukKriterier = () => {
                console.log('inni start', geografiJobbonsker, yrkeJobbonskerObj);
                const fylker = hentFylkerFraJobbønsker(geografiJobbonsker);
                const kommuner = hentKommunerFraJobbønsker(geografiJobbonsker);
                const yrkesønsker = hentYrkerFraJobbønsker(yrkeJobbonskerObj);
                console.log('inni etter', fylker, kommuner, yrkesønsker);

                const søk = new URLSearchParams();

                søk.set(QueryParam.Fylker, String(fylker));
                søk.set(QueryParam.Kommuner, String(kommuner));
                søk.set(QueryParam.Statuser, Status.Publisert);
                søk.set(QueryParam.Publisert, Publisert.Intern);
                søk.set(QueryParam.Stillingskategorier, Stillingskategori.Stilling);
                søk.set(QueryParam.Tekst, String(yrkesønsker));

                sendEvent('stillingssøk', 'kontekst_av_kandidat', {
                    antallFylker: fylker.length,
                    antallKommuner: kommuner.length,
                    antallYrkesønsker: yrkesønsker.length,
                });

                navigate({ search: søk.toString() }, { replace: true });
            };

            if (brukKandidatkriterier) {
                brukKriterier();
            }
        }
    }, [fnr, navigate, kandidat, searchParams]);

    return {
        kandidat,
        feilmelding,
    };
};

const hentFylkestekstFraGeografiKode = (geografiKode: string) => {
    return fylkerOgKommuner.find((fylke) => {
        const fylkesnummerFraKandidat = geografiKode.split('.')[0].substring(2);
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

const hentYrkerFraJobbønsker = (yrkesønsker: Jobbønske[]): string[] => {
    console.log(
        'tt',
        yrkesønsker,
        yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler)
    );
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

export default useKandidatStillingssøk;
