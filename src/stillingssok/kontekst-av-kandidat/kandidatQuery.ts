import { EsKandidat } from 'felles/domene/kandidat/EsKandidat';

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
