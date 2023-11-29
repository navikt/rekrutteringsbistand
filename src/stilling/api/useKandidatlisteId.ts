import useSWR from 'swr';
import fetcher from '../../felles/hooks/fetcher';

interface KandidatlisteId {
    kandidatlisteId: string;
}

const useKandidatlisteId = (stillingsId?: string) => {
    const { data, error, isLoading } = useSWR<KandidatlisteId>(
        stillingsId ? `/kandidat-api/veileder/stilling/${stillingsId}/kandidatlisteid` : undefined,
        fetcher
    );

    return {
        kandidatlisteId: data?.kandidatlisteId,
        isLoading,
        isError: error,
    };
};

export default useKandidatlisteId;
