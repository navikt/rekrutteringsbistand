/**
 * Endepunkt /rekrutteringsbistand/stillingsanalyse
 */
import { HttpResponse, http } from 'msw';
import { z } from 'zod';
import { postApiWithSchema } from '../fetcher';
import useSWR from 'swr';

const stillingsanalyseEndepunkt = '/stilling-api/rekrutteringsbistand/stillingsanalyse';

export const stillingsanalyseSchema = z.object({
    sensitiv: z.boolean(),
    sensitivBegrunnelse: z.string(),
    samsvarMedTittel: z.boolean(),
    tittelBegrunnelse: z.string(),
    samsvarMedType: z.boolean(),
    typeBegrunnelse: z.string(),
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

export const stillingsanalyseMockMsw = http.post(stillingsanalyseEndepunkt, async (_) => {
    return HttpResponse.json(mock);
});

const mock: StillingsanalyseDTO = {
    sensitiv: true,
    sensitivBegrunnelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    samsvarMedTittel: false,
    tittelBegrunnelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    samsvarMedType: false,
    typeBegrunnelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
