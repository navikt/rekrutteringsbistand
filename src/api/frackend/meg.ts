/**
 * Endepunkt /meg
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { Rolle } from '../../felles/tilgangskontroll/Roller';
import { getAPI } from '../fetcher';

const megEndepunkt = '/meg';

export type MegDTO = {
    navIdent: string;
    roller: Rolle[];
};

export const useMeg = () => {
    const swrData = useSWR(megEndepunkt, getAPI);
    return {
        ...swrData,
        navIdent: swrData.data?.navIdent,
        roller: swrData.data?.roller,
    };
};

export const megMockMsw = (navIdent: string, roller: Rolle[]) => {
    return http.get(megEndepunkt, () => {
        const mock: MegDTO = { navIdent: navIdent, roller: roller };
        return HttpResponse.json(mock, { status: 200 });
    });
};
