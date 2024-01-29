import useSWR from 'swr';
import { postApi } from '../../../api/fetcher';
import { kandidatSøkEndepunkter } from '../../../api/kandidat-søk-api/kandidat-søk.api';

const useCv = (kandidatnr?: string) => {
    const swrData = useSWR({ path: kandidatSøkEndepunkter.lookupCv, kandidatnr }, ({ path }) =>
        postApi(path, { kandidatnr })
    );

    const cv = swrData?.data?.hits?.hits[0]?._source;

    return { ...swrData, cv };
};

export default useCv;
