import { EsQuery } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { HentMineStillingerQuery } from '../mine-stillinger/mineStillingerSagas';

export const lagOpenSearchQuery = (
    query: HentMineStillingerQuery,
    sidestørrelse: number
): EsQuery<EsRekrutteringsbistandstilling> => {
    return {
        size: sidestørrelse,
        from: query.page * sidestørrelse,
        track_total_hits: true,
        query: byggIndreQuery(query),
        sort: byggSort(query),
    };
};

const byggSort = (query: HentMineStillingerQuery) => {
    var sortering = [
        {
            [`stilling.${query.sort.felt}`]: query.sort.retning,
        },
    ];

    return sortering;
};

const byggIndreQuery = (query: HentMineStillingerQuery) => {
    return {
        bool: {
            filter: [
                ...kunMineStillinger(query.navIdent.toUpperCase()),
                ...byggSynlighetQuery(query.deactivatedByExpiry, query.status),
            ],
        },
    };
};

export const kunMineStillinger = (navIdent: string) => [
    {
        bool: {
            should: [
                {
                    term: {
                        'stilling.administration.navIdent': navIdent,
                    },
                },
                {
                    term: {
                        'stillingsinfo.eierNavident': navIdent,
                    },
                },
            ],
        },
    },
];

export const byggSynlighetQuery = (
    visUtløpteStillinger: boolean,
    stillingStatuser: string | string[]
) => {
    if (visUtløpteStillinger) {
        return [
            {
                bool: {
                    must: [
                        {
                            bool: {
                                must_not: [
                                    {
                                        term: {
                                            'stilling.status': 'REJECTED',
                                        },
                                    },
                                    {
                                        term: {
                                            'stilling.status': 'DELETED',
                                        },
                                    },
                                    {
                                        term: {
                                            'stilling.status': 'STOPPED',
                                        },
                                    },
                                ],
                            },
                        },
                        ...deactivatedByExpiry,
                    ],
                },
            },
        ];
    } else if (Array.isArray(stillingStatuser)) {
        return [
            {
                bool: {
                    should: stillingStatuser.map((status) => {
                        return {
                            term: {
                                'stilling.status': status,
                            },
                        };
                    }),
                },
            },
            {
                bool: {
                    must_not: {
                        bool: {
                            must: deactivatedByExpiry,
                        },
                    },
                },
            },
        ];
    } else {
        return [
            {
                bool: {
                    must_not: [
                        {
                            term: {
                                'stilling.status': 'REJECTED',
                            },
                        },
                        {
                            term: {
                                'stilling.status': 'DELETED',
                            },
                        },
                        {
                            bool: {
                                must: deactivatedByExpiry,
                            },
                        },
                    ],
                },
            },
        ];
    }
};

const deactivatedByExpiry = [
    {
        exists: {
            field: 'stilling.publishedByAdmin',
        },
    },
    {
        term: {
            'stilling.status': 'INACTIVE',
        },
    },
    {
        term: {
            'stilling.administration.status': 'DONE',
        },
    },
    {
        range: {
            'stilling.expires': {
                lt: 'now/d',
            },
        },
    },
];
