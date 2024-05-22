import {
    mockFormidling,
    mockFormidlingMin,
    mockStoppetStilling,
} from '../stilling-api/mockStilling';
import {
    mockEsRekrutteringsbistandstilling,
    mockEsRekrutteringsbistandstillingEkstern,
    mockEsRekrutteringsbistandstillingEksternMin,
    mockEsRekrutteringsbistandstillingMin,
} from './mockEsStilling';

export const mockMinFormidlingSøk = [
    {
        _index: 'stilling_6',
        _type: '_doc',
        _score: 1.0,
        _id: mockFormidlingMin.stilling.uuid,
        _source: {
            ...mockFormidlingMin,
        },
    },
];

export const mockFormidlingerSøk = [
    {
        _index: 'stilling_5',
        _type: '_doc',
        _score: 1.0,
        _id: mockFormidling.stilling.uuid,
        _source: {
            ...(mockFormidling as any),
        },
    },
    ...mockMinFormidlingSøk,
];

export const mockMineStillingerSøk = [
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
];

export const mockEksternStillingSøk = [
    {
        _index: 'stilling_2',
        _type: '_doc',
        _score: 1.0,
        _id: mockEsRekrutteringsbistandstillingEkstern.stilling.uuid,
        _source: {
            ...mockEsRekrutteringsbistandstillingEkstern,
        },
    },
];

export const mockInternStillingSøk = [
    {
        _index: 'stilling_1',
        _type: '_doc',
        _score: 1.0,
        _id: mockEsRekrutteringsbistandstilling.stilling.uuid,
        _source: mockEsRekrutteringsbistandstilling,
    },
];

export const mockStoppetStillingSøk = [
    {
        _index: 'stilling_7',
        _type: '_doc',
        _score: 1.0,
        _id: mockStoppetStilling.stilling.uuid,
        _source: {
            ...mockStoppetStilling,
        },
    },
];

export const mockStillingssøk = (treff: Array<any>) => {
    return {
        took: 5,
        timed_out: false,
        _shards: { total: treff.length, successful: treff.length, skipped: 0, failed: 0 },
        hits: {
            total: {
                relation: 'eq',
                value: 6,
            },
            max_score: 1.0,
            hits: treff,
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
};
