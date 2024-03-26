/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
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
    const swrData = useSWRImmutable(hentFylkerEndepunkt, getAPI);

    // TODO Implementer  / bytt ut når getApiWithSchema er implementert
    // if (swrData.data) {
    //     return {
    //         ...swrData,
    //         data: hentFylkerSchema.parse(swrData.data),
    //     };
    // }
    return swrData;
};

const fylkeMock: FylkeDTO[] = [
    { code: '03', name: 'OSLO', capitalizedName: 'Oslo' },
    { code: '23', name: 'KONTINENTALSOKKELEN', capitalizedName: 'Kontinentalsokkelen' },
    { code: '46', name: 'VESTLAND', capitalizedName: 'Vestland' },
    { code: '32', name: 'AKERSHUS', capitalizedName: 'Akershus' },
    { code: '33', name: 'BUSKERUD', capitalizedName: 'Buskerud' },
    { code: '34', name: 'INNLANDET', capitalizedName: 'Innlandet' },
    { code: '15', name: 'MØRE OG ROMSDAL', capitalizedName: 'Møre og Romsdal' },
    { code: '40', name: 'TELEMARK', capitalizedName: 'Telemark' },
    { code: '11', name: 'ROGALAND', capitalizedName: 'Rogaland' },
    { code: '18', name: 'NORDLAND', capitalizedName: 'Nordland' },
    { code: '21', name: 'SVALBARD', capitalizedName: 'Svalbard' },
    { code: '50', name: 'TRØNDELAG', capitalizedName: 'Trøndelag' },
    { code: '56', name: 'FINNMARK', capitalizedName: 'Finnmark' },
    { code: '22', name: 'JAN MAYEN', capitalizedName: 'Jan Mayen' },
    { code: '31', name: 'ØSTFOLD', capitalizedName: 'Østfold' },
    { code: '42', name: 'AGDER', capitalizedName: 'Agder' },
    { code: '39', name: 'VESTFOLD', capitalizedName: 'Vestfold' },
    { code: '55', name: 'TROMS', capitalizedName: 'Troms' },
];
export const hentFylkerMockMsw = http.get(hentFylkerEndepunkt, (_) => HttpResponse.json(fylkeMock));
