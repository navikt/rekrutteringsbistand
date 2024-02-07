/**
 * Endepunkt /meg
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { getAPI } from '../fetcher';

const megEndepunkt = '/meg';

export enum Rolle {
    UTVIKLER = 'UTVIKLER',
    ARBEIDSGIVERRETTET = 'ARBEIDSGIVERRETTET',
    JOBBSØKERRETTET = 'JOBBSØKERRETTET',
    MODIA_GENERELL = 'MODIA_GENERELL',
}

export interface MegDTO {
    navIdent: string;
    roller: Rolle[];
}

export const useMegHook = () => {
    const swrData = useSWR(megEndepunkt, getAPI);
    return {
        ...swrData,
        navIdent: swrData.data?.navIdent,
        roller: swrData.data?.roller,
    };
};

const megMock: MegDTO = {
    navIdent: 'Z994161',
    roller: [Rolle.ARBEIDSGIVERRETTET],
};

export const megMockMsw = http.get(megEndepunkt, (_) => HttpResponse.json(megMock));
