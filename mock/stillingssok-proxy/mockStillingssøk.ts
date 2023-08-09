import { Respons } from '../../src/stillingssok/domene/elasticSearchTyper';
import { mockEsRekrutteringsbistandstilling } from './mockEsStilling';

export const mockStillingssøk: Respons = {
    took: 5,
    timed_out: false,
    _shards: { total: 3, successful: 3, skipped: 0, failed: 0 },
    hits: {
        total: {
            value: 1,
        },
        max_score: 1.0,
        hits: [
            {
                _index: 'stilling_7',
                _type: '_doc',
                _score: 1.0,
                _id: mockEsRekrutteringsbistandstilling.stilling.uuid,
                _source: mockEsRekrutteringsbistandstilling,
            },
        ],
    },
    aggregations: {
        globalAggregering: {
            felter: {
                buckets: {
                    annonsetekst: {
                        doc_count: 1,
                    },
                    tittel: {
                        doc_count: 1,
                    },
                    arbeidsgiver: {
                        doc_count: 1,
                    },
                    annonsenummer: {
                        doc_count: 0,
                    },
                },
            },
        },
    },
};
