/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPI } from '../fetcher';
import { landMock } from './mock';

export const hentLandlisteEndepunkt =
    '/stilling-api/rekrutteringsbistand/api/v1/geography/countries';

export const landSchema = z.object({
    code: z.string(),
    name: z.string(),
    capitalizedName: z.string(),
});

const hentLandlisteSchema = z.array(landSchema);

export type HentLandlisteDTO = z.infer<typeof hentLandlisteSchema>;
export type LandDTO = z.infer<typeof landSchema>;

export const useHentLandliste = () => {
    const swrData = useSWRImmutable(hentLandlisteEndepunkt, getAPI);

    if (swrData.data) {
        return {
            ...swrData,
            data: hentLandlisteSchema.parse(swrData.data),
        };
    }
    return swrData;
};

export const hentLandlisteMockMsw = http.get(hentLandlisteEndepunkt, (_) =>
    HttpResponse.json(landMock)
);
