/**
 * Endepunkt /kandidatsok-api/api/suggest/kontor
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const hentArenaKandidatnrEndepunkt = '/kandidatsok-api/api/arena-kandidatnr';

export const arenaKandidatnrSchema = z.object({
    arenaKandidatnr: z.string(),
});

export interface hentArenaKandidatnrProps {
    fnr: string;
}

export const usehentArenaKandidatnr = (props: hentArenaKandidatnrProps) => {
    const swr = useSWR({ path: hentArenaKandidatnrEndepunkt, props }, ({ path }) =>
        postApi(path, props)
    );

    return {
        ...swr,
        arenaKandidatnr: arenaKandidatnrSchema.parse(swr?.data)?.arenaKandidatnr,
    };
};

export const hentArenaKandidatnrMockMsw = http.post(hentArenaKandidatnrEndepunkt, async (_) => {
    return HttpResponse.json({ arenaKandidatnrSchema: '1234567890' });
});
