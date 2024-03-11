/**
 * Endepunkt /kandidatsok-api/api/kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';
import { SøkekriterierDto } from './kandidatsøk';
import { mockKandidatsøkNavigering } from '../../../mock/kandidatsok-proxy/mockKandidat';

const kandidatsøkNavigeringEndepunkt = '/kandidatsok-api/api/kandidatsok/navigering';

export const kandidatsøkKandidatNavigeringSchema = z.object({
    totalHits: z.string(),
    hits: z.array(z.string()),
});

export type KandidatsøkKandidatNavigering = z.infer<typeof kandidatsøkKandidatNavigeringSchema>;

export type KandidatsøkProps = {
    søkekriterier: SøkekriterierDto;
    side: number;
    sortering: string;
};

export const useKandidatsøkNavigering = (props: KandidatsøkProps) => {
    const søkekriterier: SøkekriterierDto = props.søkekriterier;

    const queryParams = new URLSearchParams({
        side: String(props.side),
        sortering: props.sortering,
    });

    const swr = useSWR({ path: kandidatsøkNavigeringEndepunkt, props }, ({ path }) =>
        postApi(path, { ...søkekriterier }, queryParams)
    );

    const kandidatsøkKandidatNavigering: KandidatsøkKandidatNavigering = swr?.data?.map((k: any) =>
        kandidatsøkKandidatNavigeringSchema.parse(k._source)
    );

    return {
        ...swr,
        kandidatsøkKandidatNavigering: kandidatsøkKandidatNavigering.hits,
        totalHits: kandidatsøkKandidatNavigering.totalHits,
    };
};

export const kandidatsøkMockMsw = http.post(kandidatsøkNavigeringEndepunkt, (_) =>
    HttpResponse.json(mockKandidatsøkNavigering)
);
