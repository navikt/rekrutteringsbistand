/**
 * Endepunkt /kandidatsok-api/api/kompetanseforslag
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { postApi } from '../fetcher';

const kompetanseforslagEndepunkt = '/kandidatsok-api/api/kompetanseforslag';

export type KompetanseforslagDTO = {
    kompetanseforslag: Kompetanseforslag;
    isLoading: boolean;
    error?: Error;
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
    const { data, error, isLoading } = useSWR<AggregationsData, Error>(
        kompetanseforslagEndepunkt,
        () => postApi(kompetanseforslagEndepunkt, props)
    );

    const kompetanseforslag: Kompetanseforslag = {
        kompetanser: data?.aggregations?.kompetanse?.buckets ?? [],
    };

    return {
        kompetanseforslag,
        isLoading: isLoading,
        error,
    };
};

const kompetanseforslagMock: Kompetanseforslag = {
    kompetanser: [
        { key: 'kompetanse1', doc_count: 1 },
        { key: 'kompetanse2', doc_count: 2 },
        { key: 'kompetanse3', doc_count: 3 },
        { key: 'kompetanse4', doc_count: 4 },
        { key: 'kompetanse5', doc_count: 5 },
        { key: 'kompetanse6', doc_count: 6 },
    ],
};

export const kompetanseforslagMockMsw = http.post(kompetanseforslagEndepunkt, (_) =>
    HttpResponse.json({
        aggregations: {
            kompetanse: {
                buckets: kompetanseforslagMock.kompetanser,
            },
        },
    })
);
