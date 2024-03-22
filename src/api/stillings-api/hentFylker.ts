/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { getAPI } from '../fetcher';

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
    const swrData = useSWR(hentFylkerEndepunkt, getAPI);

    if (swrData.data) {
        return {
            ...swrData,
            data: hentFylkerSchema.parse(swrData.data),
        };
    }
    return swrData;
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
