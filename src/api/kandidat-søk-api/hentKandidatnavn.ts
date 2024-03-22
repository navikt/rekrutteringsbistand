/**
 * Endepunkt /kandidatsok-api/api/suggest/navn
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

export enum KandidatKilde {
    REKRUTTERINGSBISTAND = 'REKRUTTERINGSBISTAND',
    PDL = 'PDL',
}

export const hentNavnEndepunkt = '/kandidatsok-api/api/navn';

export const navnSchema = z.object({
    fornavn: z.string().nullable(),
    etternavn: z.string().nullable(),
    kilde: z.nativeEnum(KandidatKilde),
});

export type Kandidatnavn = z.infer<typeof navnSchema>;

export interface hentKandidatnavnProps {
    fodselsnummer: string | null;
}

export const useHentKandidatnavn = (props: hentKandidatnavnProps) => {
    const swr = useSWR(
        props.fodselsnummer ? { path: hentNavnEndepunkt, props } : undefined,
        ({ path }) => postApi(path, props)
    );
    if (!props.fodselsnummer) {
        return {
            ...swr,
            navn: null,
        };
    }

    const navn: Kandidatnavn | undefined = swr?.data ? navnSchema.parse(swr?.data) : undefined;

    return {
        ...swr,
        navn,
    };
};

export const hentKandidatnavnMockMsw = http.post(hentNavnEndepunkt, async (_) => {
    return HttpResponse.json({ fornavn: 'Ola', etternavn: 'Nordmann', kilde: 'PDL' });
});
