/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { getAPI } from '../fetcher';

import hentFylkerMock from './fylkemock.json';

const hentFylkerEndepunkt = '/hentFylker';

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

export const hentFylkerMockMsw = http.get(hentFylkerEndepunkt, (_) =>
    HttpResponse.json(hentFylkerMock)
);
