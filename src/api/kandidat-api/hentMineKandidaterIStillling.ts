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
    stillingId: string | null;
}

export const useHentMineKandidaterIStilling = (props: mineKandidaterIStillingProps) => {
    return useSWRImmutable(
        props.stillingId ? hentMineKandidaterIStillingEndepunkt(props.stillingId) : null,
        props.stillingId ? getAPIwithSchema(hentMineKandidaterIStillingSchema) : null
    );
};

export const hentMineKandidaterIStillingMockMsw = http.get(
    hentMineKandidaterIStillingEndepunkt(':stillingsuuid'),
    async (_) => {
        return HttpResponse.json(['AB123456', 'PAM0xngui6g6']);
    }
);
