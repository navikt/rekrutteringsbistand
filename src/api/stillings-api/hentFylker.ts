/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

export const hentFylkerEndepunkt = '/stilling-api/rekrutteringsbistand/api/v1/geography/counties';

export const fylkeSchema = z.object({
    code: z.string(),
    name: z.string(),
    capitalizedName: z.string(),
});

const hentFylkerSchema = z.array(fylkeSchema);

export type HentFylkerDTO = z.infer<typeof hentFylkerSchema>;
export type FylkeDTO = z.infer<typeof fylkeSchema>;

export interface HentFylkerProps {}

export const useHentFylker = () => {
    return useSWRImmutable(hentFylkerEndepunkt, getAPIwithSchema(hentFylkerSchema));
};

const fylkeMock: FylkeDTO[] = [
    {
        code: '01',
        name: 'Fylke 1',
        capitalizedName: 'Fylke1',
    },
    {
        code: '02',
        name: 'Fylke 2',
        capitalizedName: 'Fylke2',
    },
];
export const hentFylkerMockMsw = http.get(hentFylkerEndepunkt, (_) => HttpResponse.json(fylkeMock));
