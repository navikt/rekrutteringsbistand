import useSWR from 'swr';
import fetcher from '../../felles/hooks/fetcher';

interface KandidatlisteId {
    kandidatlisteId: string;
}

const useKandidatlisteId = (stillingsId: string) => {
    const { data, error, isLoading } = useSWR<KandidatlisteId>(
        `/kandidat-api/veileder/stilling/${stillingsId}/kandidatliste`,
        fetcher
    );

    return {
        kandidatlisteId: data.kandidatlisteId,
        isLoading,
        isError: error,
    };
};

export default useKandidatlisteId;
