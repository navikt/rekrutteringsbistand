/**
 * Endepunkt /hentKommuner
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { getAPI } from '../fetcher';
import geografiMock from './kommunemock.json';

const hentKommunerEndepunkt = '/stilling-api/rekrutteringsbistand/api/v1/geography/Kommuner';

const kommuneSchema = z.object({
    code: z.string(),
    name: z.string(),
    countyCode: z.string(),
    capitalizedName: z.string(),
});

const hentKommunerSchema = z.array(kommuneSchema);

export type HentKommunerDTO = z.infer<typeof hentKommunerSchema>;
export type KommuneDTO = z.infer<typeof kommuneSchema>;

export const useHentKommuner = () => {
    const swrData = useSWR(hentKommunerEndepunkt, getAPI);

    if (swrData.data) {
        return {
            ...swrData,
            data: hentKommunerSchema.parse(swrData.data),
        };
    }
    return swrData;
};

export const hentKommunerMockMsw = http.get(hentKommunerEndepunkt, (_) =>
    HttpResponse.json(geografiMock)
);
