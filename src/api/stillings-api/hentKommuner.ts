/**
 * Endepunkt /hentKommuner
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';
import { kommuneMock } from './mock';

export const hentKommunerEndepunkt =
    '/stilling-api/rekrutteringsbistand/api/v1/geography/municipals';

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
    return useSWRImmutable(hentKommunerEndepunkt, getAPIwithSchema(hentKommunerSchema));
};

export const hentKommunerMockMsw = http.get(hentKommunerEndepunkt, (_) =>
    HttpResponse.json(kommuneMock)
);
