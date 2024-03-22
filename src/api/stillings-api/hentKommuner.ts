/**
 * Endepunkt /hentKommuner
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPI } from '../fetcher';

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
    const swrData = useSWRImmutable(hentKommunerEndepunkt, getAPI);

    if (swrData.data) {
        return {
            ...swrData,
            data: hentKommunerSchema.parse(swrData.data),
        };
    }
    return swrData;
};

const kommuneMock: KommuneDTO[] = [
    {
        code: '0101',
        name: 'Kommune1',
        countyCode: '01',
        capitalizedName: 'Kommune1',
    },
    {
        code: '0102',
        name: 'Kommune1-2',
        countyCode: '01',
        capitalizedName: 'Kommune1',
    },
    {
        code: '0103',
        name: 'Kommune1-3',
        countyCode: '01',
        capitalizedName: 'Kommune1',
    },
    {
        code: '0201',
        name: 'Kommune2',
        countyCode: '02',
        capitalizedName: 'Kommune2',
    },
];

export const hentKommunerMockMsw = http.get(hentKommunerEndepunkt, (_) =>
    HttpResponse.json(kommuneMock)
);
