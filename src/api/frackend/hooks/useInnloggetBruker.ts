import useSWR from 'swr';
import { getAPI } from '../../fetcher';
import { frackendEndepunkter } from '../proxy.api';

export type InnloggetBruker = {
    navIdent: string | null;
};

const useInnloggetBruker = () => {
    const swrData = useSWR(frackendEndepunkter.innloggetBruker, getAPI);

    const bruker: InnloggetBruker = {
        navIdent: swrData.data?.navIdent,
    };
    return {
        ...swrData,
        bruker,
    };
};

export default useInnloggetBruker;
