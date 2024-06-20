import useSWR from 'swr';
import { getAPI } from '../../api/fetcher';

interface KandidatlisteId {
    kandidatlisteId: string;
}

const useKandidatlisteId = (stillingsId?: string) => {
    const { data, error, isLoading, mutate } = useSWR<KandidatlisteId>(
        stillingsId ? `/kandidat-api/veileder/stilling/${stillingsId}/kandidatlisteid` : undefined,
        getAPI
    );

    return {
        kandidatlisteId: data?.kandidatlisteId,
        isLoading,
        isError: error,
        mutate,
    };
};

export default useKandidatlisteId;
