import useSWR from 'swr';
import { postFetcher } from '../../../felles/hooks/fetcher';
import { endepunkter } from '../../api/api';

const useCv = (kandidatnr?: string) => {
    const swrData = useSWR({ path: endepunkter.lookupCv, kandidatnr }, ({ path }) =>
        postFetcher(path, { kandidatnr })
    );

    const cv = swrData?.data?.hits?.hits[0]?._source;

    return { ...swrData, cv };
};

export default useCv;
