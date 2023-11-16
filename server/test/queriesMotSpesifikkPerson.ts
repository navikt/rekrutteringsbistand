import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';

export const queryTilKandidatsøkMedAktørIdOgFødselsnummer: EsQuery<Kandidat> = {
    query: {
        bool: {
            must: [
                {
                    bool: {
                        should: [
                            { term: { aktorId: '19418638896' } },
                            { term: { fodselsnummer: '19418638896' } },
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
};
