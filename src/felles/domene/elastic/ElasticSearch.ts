export type EsQuery<IndexedItem> = {
    size?: number;
    from?: number;
    track_total_hits?: boolean;
    suggest?: Record<
        string,
        {
            prefix: string;
            completion: {
                field: string;
                size: number;
                skip_duplicates: boolean;
            };
        }
    >;
    query: {
        term?: Record<string, string>;
        match?: Record<
            string,
            {
                query: string;
            }
        >;
        bool?: object;
        match_all?: object;
        multi_match?: {
            query: string;
            fields: string[];
        };
        match_query?: Record<
            string,
            {
                query: string;
                slop: number;
            }
        >;
        filter?: any;
    };
    sort?: Sort | Sort[];
    _source?: Array<keyof IndexedItem> | boolean;
    aggs?: AggregationsQuery;
};

type Sort =
    | string
    | {
          [felt: string]: Sorteringsrekkefølge | { order: Sorteringsrekkefølge };
      };

export type AggregationsQuery = {
    [aggregering: string]: {
        terms?: {
            field: string;
            size?: number;
        };
        sum?: {
            field: string;
        };
    };
};

export type SuggestQuery = {
    suggest: {
        forslag: {
            prefix: string;
            completion: {
                field: string;
                size: number;
                skip_duplicates: boolean;
            };
        };
    };
    _source: boolean;
};

export type Sorteringsrekkefølge = 'asc' | 'desc';

export type EsResponse<IndexedItem> = {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: 'eq';
        };
        max_score: number | null;
        hits: Array<Hit<IndexedItem>>;
    };
    suggest?: {};
    aggregations?: {
        [aggregering: string]: AggregationsResponse;
    };
};

export type Hit<IndexedItem> = {
    _index: string;
    _type: string;
    _id: string;
    _score: number | null;
    _source: IndexedItem;
    _explanation?: any;
    sort?: number[];
};

export type AggregationsResponse = {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: AggregationBucket[];
};

export type AggregationBucket = {
    key: string;
    doc_count: number;
};
