import { KandidatTilStillingssøk } from 'felles/domene/kandidat-i-søk/KandidatISøk';

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
