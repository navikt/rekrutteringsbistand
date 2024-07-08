/**
 * Endepunkt /kandidat-api/stilling/:stillingsuuid/minekandidatnummer
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

const hentMineKandidaterIStillingEndepunkt = (stillingsuuid: string) => {
    return `/kandidat-api/stilling/${stillingsuuid}/minekandidatnummer`;
};

export const hentMineKandidaterIStillingSchema = z.array(z.string());

export interface mineKandidaterIStillingProps {
    stillingsuuid: string;
}

export const useHentMineKandidaterIStilling = (props: mineKandidaterIStillingProps) => {
    return useSWRImmutable(
        hentMineKandidaterIStillingEndepunkt(props.stillingsuuid),
        getAPIwithSchema(hentMineKandidaterIStillingSchema)
    );
};

export const hentMineKandidaterIStillingMockMsw = http.get(
    hentMineKandidaterIStillingEndepunkt(':stillingsuuid'),
    async (_) => {
        return HttpResponse.json(['pam123', 'pam234']);
    }
);
