/**
 * Endepunkt /kandidatsok-api/api/suggest/navn
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const hentNavnEndepunkt = '/kandidatsok-api/api/navn';

export const navnSchema = z.object({
    fornavn: z.string().nullable(),
    etternavn: z.string().nullable(),
    kilde: z.string(),
});

export type Navn = z.infer<typeof navnSchema> | undefined;

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
            navn: undefined,
        };
    }

    const navn: Navn = navnSchema.parse(swr?.data);

    return {
        ...swr,
        navn,
    };
};

export const hentKandidatnavnMockMsw = http.post(hentNavnEndepunkt, async (_) => {
    return HttpResponse.json({ fornavn: 'Ola', etternavn: 'Nordmann', kilde: 'PDL' });
});
