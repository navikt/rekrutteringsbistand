import { useState, useEffect } from 'react';
import { api } from 'felles/api';
import { KandidatTilStillingssøk } from 'felles/domene/kandidat/Kandidat';

export type EsRespons = {
    hits: {
        hits: Array<{
            _source: KandidatTilStillingssøk;
        }>;
    };
};

type EsQuery = {
    query: object;
    size: number;
    _source: Array<keyof KandidatTilStillingssøk>;
};

const byggQuery = (kandidatnr: string): EsQuery => ({
    query: {
        term: {
            kandidatnr,
        },
    },
    size: 1,
    _source: [
        'fornavn',
        'etternavn',
        'arenaKandidatnr',
        'fodselsdato',
        'adresselinje1',
        'postnummer',
        'poststed',
        'epostadresse',
        'telefon',
        'veileder',
        'geografiJobbonsker',
        'yrkeJobbonskerObj',
    ],
});

const useKandidatForBanner = (kandidatnr: string) => {
    const [kandidat, setKandidat] = useState<KandidatTilStillingssøk>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    useEffect(() => {
        const hentKandidat = async (kandidatnr: string) => {
            try {
                const respons = await fetch(api.kandidatsøk, {
                    method: 'POST',
                    body: JSON.stringify(byggQuery(kandidatnr)),
                    headers: { 'Content-Type': 'application/json' },
                });

                const esRespons = (await respons.json()) as EsRespons;
                const kandidat = esRespons.hits.hits.at(0)?._source;

                if (kandidat) {
                    setKandidat(kandidat);
                } else {
                    setFeilmelding('Fant ikke kandidat med kandidatnr ' + kandidatnr);
                }
            } catch (e) {
                setFeilmelding('Klarte ikke å hente kandidat');
            }
        };

        hentKandidat(kandidatnr);
    }, [kandidatnr]);

    return {
        kandidat,
        feilmelding,
    };
};

export default useKandidatForBanner;
