/**
 * Endepunkt /kandidatsok-api/veileder/kandidatlister/:kandidatlisteId/antallKandidater
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

const kandidatlisterEndepunkt = '/kandidat-api/veileder/kandidatlister';

export const antallKandidaterSchema = z.object({
    antallKandidater: z.number().nullable(),
});

export interface hentAntallKandidaterIListeProps {
    kandidatlisteId: string;
}

export const useHentAntallKandidaterIStilling = (props: hentAntallKandidaterIListeProps) => {
    return useSWRImmutable(
        `${kandidatlisterEndepunkt}/${props.kandidatlisteId}/antallKandidater`,
        getAPIwithSchema(antallKandidaterSchema)
    );
};

export const hentAntallKandidaterIStillingMockMsw = http.get(
    `${kandidatlisterEndepunkt}/:kandidatlisteId/antallKandidater`,
    async (_) => {
        return HttpResponse.json({ antallKandidater: 2 });
    }
);
