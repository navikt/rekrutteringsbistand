import { Bucket } from 'felles/domene/elastic/ElasticSearch';
import { Søkefelt } from '../søkefelter/Søkefelter';

export type GlobalAggregering = {
    felter: {
        buckets: Partial<Record<Søkefelt, Bucket>>;
    };
};
