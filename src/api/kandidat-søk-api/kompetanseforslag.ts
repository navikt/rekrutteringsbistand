/**
 * Endepunkt /forslagKompetanse
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { postApi } from '../fetcher';

const kompetanseforslagEndepunkt = '/kandidatsok-api/api/kompetanseforslag';

export type KompetanseforslagDTO = {
    kompetanseforslag: Kompetanseforslag;
    isLoading: boolean;
    error: any;
};

export interface KompetanseforslagProps {
    yrke: string;
}

export type Kompetanseforslag = { kompetanser: Bucket[] };

type Bucket = {
    key: string;
    doc_count: number;
};

interface AggregationsData {
    aggregations: {
        kompetanse: {
            buckets: Bucket[];
        };
    };
}

export const useKompetanseforslag = (props: KompetanseforslagProps[]): KompetanseforslagDTO => {
    const swr = useSWR({ path: kompetanseforslagEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    const swrData: AggregationsData = swr.data;

    const kompetanseforslag: Kompetanseforslag = {
        kompetanser: swrData?.aggregations?.kompetanse?.buckets
            ? swrData?.aggregations?.kompetanse?.buckets
            : [],
    };

    return {
        ...swr,
        kompetanseforslag,
    };
};

const kompetanseforslagMock: Kompetanseforslag = {
    kompetanser: [
        { key: 'kompetanse1', doc_count: 1 },
        { key: 'kompetanse2', doc_count: 2 },
        { key: 'kompetanse3', doc_count: 3 },
    ],
};

export const kompetanseforslagMockMsw = http.post(kompetanseforslagEndepunkt, (_) =>
    HttpResponse.json({
        aggregations: {
            kompetanse: {
                buckets: kompetanseforslagMock.kompetanser.map((kompetanse) => ({
                    key: kompetanse.key,
                })),
            },
        },
    })
);
