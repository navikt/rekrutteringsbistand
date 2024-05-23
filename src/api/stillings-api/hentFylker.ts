/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';
import { fylkeMock } from './mock';

export const hentFylkerEndepunkt = '/stilling-api/rekrutteringsbistand/api/v1/geography/counties';

export const fylkeSchema = z.object({
    code: z.string(),
    name: z.string(),
    capitalizedName: z.string(),
});

const hentFylkerSchema = z.array(fylkeSchema);

export type HentFylkerDTO = z.infer<typeof hentFylkerSchema>;
export type FylkeDTO = z.infer<typeof fylkeSchema>;

export const useHentFylker = () => {
    return useSWRImmutable(hentFylkerEndepunkt, getAPIwithSchema(hentFylkerSchema));
};

export const hentFylkerMockMsw = http.get(hentFylkerEndepunkt, (_) => HttpResponse.json(fylkeMock));
