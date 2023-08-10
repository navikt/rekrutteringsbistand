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

export const byggKandidatQuery = (fodselsnummer: string): EsQuery => ({
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
