import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';

export const queryTilKandidatsøkMedAktørIdOgFødselsnummer = (
    personId: string
): EsQuery<Kandidat> => ({
    query: {
        bool: {
            must: [
                {
                    bool: {
                        should: [
                            { term: { aktorId: personId } },
                            { term: { fodselsnummer: personId } },
                        ],
                    },
                },
                { terms: { kvalifiseringsgruppekode: ['BATT', 'BFORM', 'IKVAL', 'VARIG'] } },
            ],
        },
    },
    size: 25,
    from: 0,
    track_total_hits: true,
    sort: { tidsstempel: { order: 'desc' } },
    _source: [
        'fodselsnummer',
        'fornavn',
        'etternavn',
        'arenaKandidatnr',
        'kvalifiseringsgruppekode',
        'yrkeJobbonskerObj',
        'geografiJobbonsker',
        'kommuneNavn',
        'postnummer',
    ],
});

export const queryTilHentKandidat = (fodselsnummer: string): EsQuery<Kandidat> => ({
    size: 1,
    query: { term: { fodselsnummer: fodselsnummer } },
});
