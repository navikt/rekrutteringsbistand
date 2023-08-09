import { useState, useEffect } from 'react';
import { api } from 'felles/api';
import EsKandidat from 'felles/domene/kandidat/EsKandidat';

export type EsRespons = {
    hits: {
        hits: Array<{
            _source: EsKandidat;
        }>;
    };
};

type EsQuery = {
    query: object;
    size: number;
    _source: Array<keyof EsKandidat>;
};

export const byggQueryKandidatnr = (kandidatnr: string): EsQuery => ({
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

export const byggQueryFodselsnummer = (fodselsnummer: string): EsQuery => ({
    query: {
        term: {
            fodselsnummer,
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

const useEsKandidat = (esQuery: EsQuery) => {
    const [kandidat, setKandidat] = useState<EsKandidat>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    useEffect(() => {
        const hentKandidat = async (esQuery: EsQuery) => {
            try {
                const respons = await fetch(api.kandidatsøk, {
                    method: 'POST',
                    body: JSON.stringify(esQuery),
                    headers: { 'Content-Type': 'application/json' },
                });

                const esRespons = (await respons.json()) as EsRespons;
                console.log('esRespons', esRespons);
                const kandidat = esRespons.hits.hits.at(0)?._source;

                if (kandidat) {
                    setKandidat(kandidat);
                } else {
                    setFeilmelding('Fant ikke kandidat');
                }
            } catch (e) {
                setFeilmelding('Klarte ikke å hente kandidat');
            }
        };

        hentKandidat(esQuery);
    }, [esQuery]);

    return {
        kandidat,
        feilmelding,
    };
};

export default useEsKandidat;
