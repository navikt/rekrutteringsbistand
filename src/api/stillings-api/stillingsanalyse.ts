import useSWR from 'swr';
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
    const { stillingsId, stillingstype, stillingstittel, stillingstekst } = props;

    const key =
        !vis || !stillingstekst || stillingstekst.trim() === ''
            ? null
            : [
                  stillingsanalyseEndepunkt,
                  stillingsId,
                  stillingstype,
                  stillingstittel,
                  stillingstekst,
              ];

    const fetcher = () =>
        postApiWithSchema(stillingsanalyseSchema)({
            url: stillingsanalyseEndepunkt,
            body: props,
        });

    const { data, error, isLoading } = useSWR(key, fetcher);

    return {
        stillingsanalyse: data ?? null,
        isLoading: isLoading,
        error: error,
    };
};
