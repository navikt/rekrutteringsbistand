import { sendEvent } from 'felles/amplitude';
import { api } from 'felles/api';
import { Jobbønske, JobbønskeSted } from 'felles/domene/kandidat/Jobbprofil';
import { KandidatTilStillingssøk } from 'felles/domene/kandidat/Kandidat';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { useEffect, useState } from 'react';
import fylkerOgKommuner from '../filter/geografi/fylkerOgKommuner.json';
import { brukNyttFylkesnummer } from '../filter/geografi/regionsreformen';
import { Status } from '../filter/om-annonsen/Annonsestatus';
import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
import useNavigering from '../useNavigering';
import { QueryParam } from '../utils/urlUtils';
import { EsRespons, byggKandidatQuery } from './kandidatQuery';

const useKandidat = (fnr: string) => {
    const { searchParams, navigate } = useNavigering();
    const brukKandidatkriterier = searchParams.get(QueryParam.Kandidatkriterier) !== null;

    const [kandidat, setKandidat] = useState<KandidatTilStillingssøk>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    useEffect(() => {
        const brukKriterier = (kandidat: KandidatTilStillingssøk) => {
            const fylker = hentFylkerFraJobbønsker(kandidat.geografiJobbonsker);
            const kommuner = hentKommunerFraJobbønsker(kandidat.geografiJobbonsker);
            const yrkesønsker = hentYrkerFraJobbønsker(kandidat.yrkeJobbonskerObj);

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

        const hentKandidat = async (fnr: string) => {
            try {
                const respons = await fetch(api.kandidatsøk, {
                    method: 'POST',
                    body: JSON.stringify(byggKandidatQuery(fnr)),
                    headers: { 'Content-Type': 'application/json' },
                });

                const esRespons = (await respons.json()) as EsRespons;
                const kandidat = esRespons.hits.hits.at(0)?._source;

                if (kandidat) {
                    setKandidat(kandidat);

                    if (brukKandidatkriterier) {
                        brukKriterier(kandidat);
                    }
                } else {
                    setFeilmelding('Fant ikke kandidat med fødselsnummer ' + fnr);
                }
            } catch (e) {
                setFeilmelding('Klarte ikke å hente kandidat');
            }
        };

        hentKandidat(fnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fnr]);

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
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

export default useKandidat;
