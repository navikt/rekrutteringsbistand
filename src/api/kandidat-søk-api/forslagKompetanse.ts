/**
 * Endepunkt /forslagKompetanse
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { postApi } from '../fetcher';

const forslagKompetanseEndepunkt = '/kandidatsok-api/api/forslagKompetanse';

export type ForslagKompetanseDTO = {
    kompetanseforslag?: forslagKompetanser;
    isLoading: boolean;
    error: any;
};

export interface ForslagKompetanseProps {
    yrke: string;
}
[];

export type forslagKompetanser = Array<string>;

type Bucket = {
    key: string;
    doc_count: number;
};

interface AggregationsData {
    aggregations: {
        kompetanse: {
            doc_count_error_upper_bound: number;
            sum_other_doc_count: number;
            buckets: Bucket[];
        };
    };
}

export const useForslagKompetanse = (props: ForslagKompetanseProps): ForslagKompetanseDTO => {
    const swrData = useSWR({ path: forslagKompetanseEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    const kompetanseforslag = swrData?.data.aggregations.kompetanse.buckets.map(
        (bucket: Bucket) => bucket.key
    );

    return {
        ...swrData,
        kompetanseforslag,
    };
};

const forslagKompetanseMock: forslagKompetanser = ['kompetanse1', 'kompetanse2', 'kompetanse3'];

export const forslagKompetanseMockMsw = http.get(forslagKompetanseEndepunkt, (_) =>
    HttpResponse.json({
        aggregations: {
            kompetanse: {
                doc_count_error_upper_bound: 0,
                sum_other_doc_count: 0,
                buckets: forslagKompetanseMock.map((kompetanse) => ({
                    key: kompetanse,
                    doc_count: 1,
                })),
            },
        },
    })
);
