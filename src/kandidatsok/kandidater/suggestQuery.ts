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

export type FuzzySuggestQuery = {
    query: {
        match_phrase: {
            [field: string]: {
                query: string;
                slop: number;
            };
        };
    };
    aggs: {
        suggestions: {
            terms: {
                field: string;
            };
        };
    };
    size: number;
    _source: boolean;
};

export type SuggestionRespons = {
    suggest: {
        forslag: Array<{
            text: string;
            offset: number;
            length: number;
            options: Option[];
        }>;
    };
};

export type FuzzySuggestionRespons = {
    aggregations: {
        suggestions: {
            buckets: Array<{
                key: string;
            }>;
        };
    };
};

export type Option = {
    text: string;
    _source?: object;
};
