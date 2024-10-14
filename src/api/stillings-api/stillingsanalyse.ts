/**
 * Endepunkt /rekrutteringsbistand/stillingsanalyse
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { postApiWithSchema } from '../fetcher';

const stillingsanalyseEndepunkt = '/stilling-api/rekrutteringsbistand/stillingsanalyse';

export const stillingsanalyseSchema = z.object({
    sensitiv: z.boolean(),
    begrunnelse: z.string(),
});

export const stillingsanalyseRequestSchema = z.object({
    stillingsId: z.string(),
    stillingstype: z.string().nullable(),
    stillingstittel: z.string().nullable(),
    stillingstekst: z.string(),
});

export type StillingsanalyseDTO = z.infer<typeof stillingsanalyseSchema>;
export type StillingsanalyseRequestDTO = z.infer<typeof stillingsanalyseRequestSchema>;

export const useStillingsanalyse = (props: StillingsanalyseRequestDTO, vis: boolean) => {
    const key =
        !vis || !props.stillingstekst || props.stillingstekst.trim() === ''
            ? null
            : [stillingsanalyseEndepunkt, props];

    const { data, error, isValidating } = useSWRImmutable(key, () =>
        postApiWithSchema(stillingsanalyseSchema)({
            url: stillingsanalyseEndepunkt,
            body: props,
        })
    );

    return {
        stillingsanalyse: data ?? null,
        isLoading: isValidating,
        error: error,
    };
};

export const stillingsanalyseMockMsw = http.post(stillingsanalyseEndepunkt, async (_) => {
    HttpResponse.json({ sensitiv: false, begrunnelse: '' });
});
