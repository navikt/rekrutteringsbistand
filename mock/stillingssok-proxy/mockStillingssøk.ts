import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { GlobalAggregering } from '../../src/stillingssok/domene/elasticSearchTyper';
import { mockAlleEsRekrutteringsbistandstillinger } from './mockEsStilling';

export const mockStillingssøk: Omit<EsResponse<EsRekrutteringsbistandstilling>, 'aggregations'> & {
    aggregations: {
        globalAggregering: GlobalAggregering;
    };
} = {
    took: 5,
    timed_out: false,
    _shards: { total: 3, successful: 3, skipped: 0, failed: 0 },
    hits: {
        total: {
            relation: 'eq',
            value: mockAlleEsRekrutteringsbistandstillinger.length,
        },
        max_score: 1.0,
        hits: mockAlleEsRekrutteringsbistandstillinger.map((stilling) => ({
            _index: 'stilling_7',
            _type: '_doc',
            _score: 1.0,
            _id: stilling.stilling.uuid,
            _source: stilling,
        })),
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
