import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { GlobalAggregering } from '../../src/stilling/stillingssok/domene/elasticSearchTyper';
import { mockFormidling, mockFormidlingMin } from '../stilling-api/mockStilling';
import {
    mockEsRekrutteringsbistandstilling,
    mockEsRekrutteringsbistandstillingEkstern,
    mockEsRekrutteringsbistandstillingEksternMin,
    mockEsRekrutteringsbistandstillingMin,
} from './mockEsStilling';

export const mockStillingssøk: Omit<EsResponse<EsRekrutteringsbistandstilling>, 'aggregations'> & {
    aggregations: {
        globalAggregering: GlobalAggregering;
    };
} = {
    took: 5,
    timed_out: false,
    _shards: { total: 6, successful: 6, skipped: 0, failed: 0 },
    hits: {
        total: {
            relation: 'eq',
            value: 6,
        },
        max_score: 1.0,
        hits: [
            {
                _index: 'stilling_1',
                _type: '_doc',
                _score: 1.0,
                _id: mockEsRekrutteringsbistandstilling.stilling.uuid,
                _source: mockEsRekrutteringsbistandstilling,
            },
            {
                _index: 'stilling_2',
                _type: '_doc',
                _score: 1.0,
                _id: mockEsRekrutteringsbistandstillingEkstern.stilling.uuid,
                _source: {
                    ...mockEsRekrutteringsbistandstillingEkstern,
                },
            },
            {
                _index: 'stilling_3',
                _type: '_doc',
                _score: 1.0,
                _id: mockEsRekrutteringsbistandstillingMin.stilling.uuid,
                _source: {
                    ...mockEsRekrutteringsbistandstillingMin,
                },
            },
            {
                _index: 'stilling_4',
                _type: '_doc',
                _score: 1.0,
                _id: mockEsRekrutteringsbistandstillingEksternMin.stilling.uuid,
                _source: {
                    ...mockEsRekrutteringsbistandstillingEksternMin,
                },
            },
            {
                _index: 'stilling_5',
                _type: '_doc',
                _score: 1.0,
                _id: mockFormidling.stilling.uuid,
                _source: {
                    ...(mockFormidling as any),
                },
            },
            {
                _index: 'stilling_6',
                _type: '_doc',
                _score: 1.0,
                _id: mockFormidlingMin.stilling.uuid,
                _source: {
                    ...mockFormidlingMin,
                },
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
