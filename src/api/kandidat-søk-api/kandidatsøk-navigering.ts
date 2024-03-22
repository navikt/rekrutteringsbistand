/**
 * Endepunkt /kandidatsok-api/api/kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';
import { SøkekriterierDto } from './kandidatsøk';
import { mockKandidatsøkNavigering } from './mockKandidatsøk';

const kandidatsøkNavigeringEndepunkt = '/kandidatsok-api/api/kandidatsok/navigering';

export const kandidatsøkKandidatNavigeringSchema = z.object({
    antall: z.number(),
    kandidatnumre: z.array(z.string()),
});

export type KandidatsøkKandidatNavigering = z.infer<typeof kandidatsøkKandidatNavigeringSchema>;

export type KandidatsøkNavigeringProps = {
    søkekriterier: SøkekriterierDto;
    side: number;
    sortering: string;
};

export const useKandidatsøkNavigering = (props: KandidatsøkNavigeringProps) => {
    const søkekriterier: SøkekriterierDto = props.søkekriterier;

    const queryParams = new URLSearchParams({
        side: String(props.side),
        sortering: props.sortering,
    });

    const swr = useSWR({ path: kandidatsøkNavigeringEndepunkt, props }, ({ path }) =>
        postApi(path, { ...søkekriterier }, queryParams)
    );

    const kandidatsøkKandidatNavigering: KandidatsøkKandidatNavigering | undefined = swr?.data
        ? kandidatsøkKandidatNavigeringSchema.parse(swr?.data)
        : undefined;

    return {
        ...swr,
        kandidatsøkKandidatNavigering: kandidatsøkKandidatNavigering?.kandidatnumre,
        totalHits: kandidatsøkKandidatNavigering?.antall,
    };
};

export const kandidatsøkNavigeringMockMsw = http.post(kandidatsøkNavigeringEndepunkt, (_) =>
    HttpResponse.json(mockKandidatsøkNavigering)
);
