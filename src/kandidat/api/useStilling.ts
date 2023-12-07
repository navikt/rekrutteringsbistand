import useSWR from 'swr';
import { Rekrutteringsbistandstilling } from '../../felles/domene/stilling/Stilling';
import fetcher from '../../felles/hooks/fetcher';

const useHentStilling = (stillingsId?: string) => {
    const { data, error, isLoading } = useSWR<Rekrutteringsbistandstilling>(
        stillingsId ? `/stilling-api/rekrutteringsbistandstilling/${stillingsId}` : undefined,
        fetcher
    );
    return {
        stilling: data,
        isLoading,
        isError: error,
    };
};

export const useHentStillingTittel = (stillingsId?: string) => {
    const { isError, isLoading, stilling } = useHentStilling(stillingsId);

    if (isLoading) {
        return 'laster stillingstittel ...';
    }

    if (isError) {
        return 'Klarte ikke å hente stillingstittel';
    }

    return stilling?.stilling?.title ?? 'Ukjent stillingstittel';
};

export default useHentStilling;
