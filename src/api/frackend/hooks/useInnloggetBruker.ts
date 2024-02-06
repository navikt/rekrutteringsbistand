import useSWR from 'swr';
import { getAPI } from '../../fetcher';
import { frackendEndepunkter } from '../proxy.api';

export type InnloggetBruker = {
    navIdent: string | null;
    navKontor: string | null;
};

const useInnloggetBruker = (navKontor?: string | null) => {
    const swrData = useSWR(frackendEndepunkter.innloggetBruker, getAPI);

    const bruker: InnloggetBruker = {
        navKontor,
        navIdent: swrData.data?.navIdent,
    };
    return {
        ...swrData,
        bruker,
    };
};

export default useInnloggetBruker;
