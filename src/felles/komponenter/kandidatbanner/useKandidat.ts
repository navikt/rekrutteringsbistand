import { api } from 'felles/api';
import Kandidat, { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';

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
    _source: Array<keyof KandidatTilBanner>;
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
        'fodselsnummer',
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

const useKandidat = (term: Term): Nettressurs<KandidatTilBanner> => {
    const [kandidat, setKandidat] = useState<Nettressurs<KandidatTilBanner>>({
        kind: Nettstatus.LasterInn,
    });
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
                    setKandidat({
                        kind: Nettstatus.Suksess,
                        data: kandidat,
                    });
                } else {
                    setKandidat({
                        kind: Nettstatus.Feil,
                        error: { message: 'Kandidaten er ikke tilgjengelig' },
                    });
                }
            } catch (e) {
                setKandidat({
                    kind: Nettstatus.Feil,
                    error: { message: 'Det skjedde en feil ved henting av kandidat' },
                });
            }
        })();
    }, [key, value]);

    return kandidat;
};

export default useKandidat;
