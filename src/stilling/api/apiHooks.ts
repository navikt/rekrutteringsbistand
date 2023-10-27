import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Rekrutteringsbistandstilling } from '../../felles/domene/stilling/Stilling';
import { stillingEndepunkter } from './apiStilling';
import { fetchGet, fetchPost } from './apiUtils';

export const useMutateKopierStilling = (stillingId: string) => {
    const { data, error, trigger } = useSWRMutation(
        stillingEndepunkter.kopierStilling(stillingId),
        fetchPost
    );

    return {
        stilling: data,
        trigger,
        isError: error,
    };
};

export const useHentStilling = (stillingId: string) => {
    const { data, error, isLoading } = useSWR<Rekrutteringsbistandstilling>(
        stillingEndepunkter.hentStilling(stillingId),
        fetchGet
    );

    return {
        data,
        isLoading,
        error,
    };
};
