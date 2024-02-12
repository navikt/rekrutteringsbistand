/**
 * Endepunkt /kandidatsok-api/api//kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidatsøkKandidater } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';
import { Søkekriterier } from '../../kandidatsok/hooks/useSøkekriterier';
import { KandidatTilKandidatsøk } from 'felles/domene/kandidat/Kandidat';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsok';

export type KandidatsøkDTO = {
    kandidatsøkKandidater: KandidatTilKandidatsøk[];
    isLoading: boolean;
    error: any;
    totalHits: number;
};

type KandidatsøkProps = Søkekriterier;

export const useKandidatsøk = (props: KandidatsøkProps): KandidatsøkDTO => {
    const swr = useSWR({ path: kandidatsøkEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    const kandidatsøkKandidater: KandidatTilKandidatsøk[] = swr?.data?.hits?.hits.map(
        (k: any) => k._source
    );

    const totalHits = swr?.data?.hits?.total?.value;

    return {
        ...swr,
        kandidatsøkKandidater,
        totalHits,
    };
};

export const kandidatsøkMockMsw = http.post(kandidatsøkEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: mockKandidatsøkKandidater.map((kandidat) => ({
                _source: kandidat,
            })),
        },
    })
);
