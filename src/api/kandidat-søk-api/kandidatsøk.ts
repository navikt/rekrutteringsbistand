/**
 * Endepunkt /kandidatsok-api/api//kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidatsøkKandidater } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';
import { Søkekriterier } from '../../kandidatsok/hooks/useSøkekriterier';
import { KandidatTilKandidatsøk } from 'felles/domene/kandidat/Kandidat';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsøk';

export type KandidatsøkDTO = {
    kandidatsøkKandidater: KandidatTilKandidatsøk[];
    isLoading: boolean;
    error: any;
    totalHits: number;
};

type KandidatsøkProps = Søkekriterier;

export const useKandidatsøk = (props: KandidatsøkProps): KandidatsøkDTO => {
    const swrData = useSWR({ path: kandidatsøkEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );
    const kandidatsøkKandidater: KandidatTilKandidatsøk[] = swrData?.data?.hits?.hits.map(
        (k: any) => k._source
    );

    const totalHits = swrData?.data?.hits?.total.value;

    return {
        ...swrData,
        kandidatsøkKandidater,
        totalHits,
    };
};

export const kandidatsøkMockMsw = http.get(kandidatsøkEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: [
                {
                    _source: mockKandidatsøkKandidater,
                },
            ],
        },
    })
);
