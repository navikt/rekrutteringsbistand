import useSWR from 'swr';
import { hentApi } from '../../../api/fetcher';
import { api } from '../../../felles/api';

const useSynlighetsevaluering = (fødselsnummer: string) => {
    const { data, error, isLoading } = useSWR(
        fødselsnummer ? `${api.synlighet}/evaluering/${fødselsnummer}` : undefined,
        hentApi
    );

    return {
        data,
        isLoading,
        error,
    };
};

export default useSynlighetsevaluering;
