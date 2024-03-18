/**
 * Endepunkt /kandidatsok-api/api/suggest/arena-kandidatnr
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const hentNavnEndepunkt = '/kandidatsok-api/api/navn';

export const arenaKandidatnrSchema = z.object({
    fornavn: z.string().nullable(),
    etternavn: z.string().nullable(),
    kilde: z.string(),
});

export interface hentArenaKandidatnrProps {
    fodselsnummer: string | null;
}

export const useHentArenaKandidatnr = (props: hentArenaKandidatnrProps) => {
    const swr = useSWR(
        props.fodselsnummer ? { path: hentNavnEndepunkt, props } : undefined,
        ({ path }) => postApi(path, props)
    );
    if (!props.fodselsnummer) {
        return {
            ...swr,
            arenaKandidatnr: undefined,
        };
    }

    return {
        ...swr,
        navn: swr?.data ? arenaKandidatnrSchema.parse(swr?.data) : undefined,
    };
};

export const hentArenaKandidatnrMockMsw = http.post(hentNavnEndepunkt, async (_) => {
    return HttpResponse.json({ fornavn: 'Ola', etternavn: 'Nordmann', kilde: 'PDL' });
});
