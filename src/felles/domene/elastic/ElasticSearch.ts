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
    sort?: Sort | Sort[] | any;
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
        global?: {};
        terms?: {
            field: string;
            size?: number;
        };
        sum?: {
            field: string;
        };
        filters?: {
            filters: Record<string, object>;
        };
        aggs?: AggregationsQuery;
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
        [aggregering: string]: AggregationsResponse | SubAggregationsResponse;
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

export type SubAggregationsResponse = Record<string, SubAggregation>;

export type SubAggregation = {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: Record<string, AggregationBucket>;
};

export type AggregationBucket = {
    key?: string;
    doc_count: number;
};
