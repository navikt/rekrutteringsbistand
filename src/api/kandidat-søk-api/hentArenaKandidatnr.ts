/**
 * Endepunkt /kandidatsok-api/api/suggest/arena-kandidatnr
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

export const hentArenaKandidatnrEndepunkt = '/kandidatsok-api/api/arena-kandidatnr';

export const arenaKandidatnrSchema = z.object({
    arenaKandidatnr: z.string().nullable(),
});

export interface hentArenaKandidatnrProps {
    fodselsnummer: string | null;
}

export const useHentArenaKandidatnr = (props: hentArenaKandidatnrProps) => {
    const swr = useSWR(
        props.fodselsnummer ? { path: hentArenaKandidatnrEndepunkt, props } : undefined,
        ({ path }) => postApi(path, props)
    );
    if (!props.fodselsnummer) {
        return {
            ...swr,
            arenaKandidatnr: undefined,
        };
    }
    const arenaKandidatnr = swr?.data
        ? arenaKandidatnrSchema.parse(swr?.data).arenaKandidatnr
        : undefined;

    return {
        ...swr,
        arenaKandidatnr,
    };
};

export const hentArenaKandidatnrMockMsw = http.post(hentArenaKandidatnrEndepunkt, async (_) => {
    return HttpResponse.json({ arenaKandidatnr: '1234567890' });
});
