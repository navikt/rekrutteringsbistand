import useSWR from 'swr';
import { hentTittelFraStilling, Rekrutteringsbistandstilling } from '../domene/stilling/Stilling';
import { fetcher } from './fetcher';

const useHentStilling = (stillingsId?: string | null) => {
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

export const useHentStillingTittel = (stillingsId?: string | null) => {
    const { isError, isLoading, stilling } = useHentStilling(stillingsId);

    if (!stillingsId) {
        return undefined;
    }

    if (isLoading) {
        return 'laster stillingstittel ...';
    }

    if (isError) {
        return 'Klarte ikke å hente stillingstittel';
    }

    return stilling?.stilling ? hentTittelFraStilling(stilling.stilling) : 'Ukjent stillingstittel';
};

export default useHentStilling;
