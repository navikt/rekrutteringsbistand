import { Søkefelt } from '../søkefelter/Søkefelter';

export type GlobalAggregering = {
    felter: {
        buckets: Partial<Record<Søkefelt, { doc_count: number }>>;
    };
};
