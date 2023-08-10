import { useState, useEffect } from 'react';
import { api } from 'felles/api';
import Kandidat from 'felles/domene/kandidat/Kandidat';

export type EsRespons = {
    hits: {
        hits: Array<{
            _source: Kandidat;
        }>;
    };
};

type EsQuery = {
    query: object;
    size: number;
    _source: Array<keyof Kandidat>;
};

export const byggQueryTerm = (term: Term): EsQuery => ({
    query: {
        term: {
            [term.key]: term.value,
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

type Term = {
    key: 'kandidatnr' | 'fodselsnummer';
    value: string;
};

export const kandidatnrTerm = (kandidatnr: string): Term => {
    return { key: 'kandidatnr', value: kandidatnr };
};

export const fodselsnrTerm = (fodselsnummer: string): Term => {
    return { key: 'fodselsnummer', value: fodselsnummer };
};

const useKandidat = (term: Term) => {
    const [kandidat, setKandidat] = useState<Kandidat>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const { key, value } = term;
    useEffect(() => {
        (async () => {
            try {
                const respons = await fetch(api.kandidatsøk, {
                    method: 'POST',
                    body: JSON.stringify(byggQueryTerm({ key, value })),
                    headers: { 'Content-Type': 'application/json' },
                });

                const esRespons = (await respons.json()) as EsRespons;
                const kandidat = esRespons.hits.hits.at(0)?._source;

                if (kandidat) {
                    setKandidat(kandidat);
                } else {
                    setFeilmelding('Fant ikke kandidat');
                }
            } catch (e) {
                setFeilmelding('Klarte ikke å hente kandidat');
            }
        })();
    }, [key, value]);

    return {
        kandidat,
        feilmelding,
    };
};

export default useKandidat;
