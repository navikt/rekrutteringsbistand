import useSWR from 'swr';
import { postApi } from '../../../api/fetcher';
import { api } from '../../../felles/api';

const useSynlighetsevaluering = (fødselsnummer: string) => {
    const { data, error, isLoading } = useSWR(
        fødselsnummer ? `${api.synlighet}/evaluering` : undefined,
        (url) => postApi(url, { fnr: fødselsnummer })
    );

    return {
        data,
        isLoading,
        error,
    };
};

export default useSynlighetsevaluering;
