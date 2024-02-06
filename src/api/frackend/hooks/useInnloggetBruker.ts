import useSWR from 'swr';
import { frackendEndepunkter } from '../proxy.api';
import { getAPI } from '../../fetcher';

const useInnloggetBruker = () => {
    const swrData = useSWR(frackendEndepunkter.innloggetBruker, getAPI);

    return {
        ...swrData,
        navIdent: swrData.data?.navIdent,
        roller: swrData.data?.roller,
    };
};
export default useInnloggetBruker;
