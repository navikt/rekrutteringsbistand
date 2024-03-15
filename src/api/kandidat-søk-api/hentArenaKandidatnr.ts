/**
 * Endepunkt /kandidatsok-api/api/suggest/kontor
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const hentArenaKandidatnrEndepunkt = '/kandidatsok-api/api/arena-kandidatnr';

export const arenaKandidatnrSchema = z.object({
    arenaKandidatnr: z.string().nullable(),
});

export interface hentArenaKandidatnrProps {
    fnr: string | null;
}

export const useHentArenaKandidatnr = (props: hentArenaKandidatnrProps) => {
    const swr = useSWR(
        props.fnr ? { path: hentArenaKandidatnrEndepunkt, props } : undefined,
        ({ path }) => postApi(path, props)
    );

    return {
        ...swr,
        arenaKandidatnr: arenaKandidatnrSchema.parse(swr?.data)?.arenaKandidatnr,
    };
};

export const hentArenaKandidatnrMockMsw = http.post(hentArenaKandidatnrEndepunkt, async (_) => {
    return HttpResponse.json({ arenaKandidatnr: '1234567890' });
});
