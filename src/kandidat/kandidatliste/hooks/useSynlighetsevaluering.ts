import useSWR from 'swr';
import { api } from '../../../felles/api';
import fetcher from '../../../felles/hooks/fetcher';

const useSynlighetsevaluering = (fødselsnummer: string) => {
    const { data, error, isLoading } = useSWR(
        fødselsnummer ? `${api.synlighet}/evaluering/${fødselsnummer}` : undefined,
        fetcher
    );

    return {
        data,
        isLoading,
        error,
    };
};

export default useSynlighetsevaluering;
