export type SearchQuery = {
    query: {
        bool?: {
            must?: Array<{
                bool?: {
                    should?: Array<{
                        term?: {
                            [felt: string]: string;
                        };
                    }>;
                };
            }>;
        };
        term?: {
            [felt: string]: string;
        };
    };
    _source?: boolean | string[];
    size?: number;
};
