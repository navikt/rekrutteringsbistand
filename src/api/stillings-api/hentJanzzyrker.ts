import useSWR from 'swr';
import { getAPIwithSchema } from '../fetcher';
import { z } from 'zod';
import { api } from 'felles/api';

export const hentJanzzYrkerEndepunkt = `${api.pamOntologi}/rest/typeahead/stilling`;

export const janzzStillingSchema = z.object({
    label: z.string(),
    konseptId: z.number(),
});

const hentJanzzYrkerSchema = z.array(janzzStillingSchema);

export type JanzzStillingDTO = z.infer<typeof janzzStillingSchema>;
export type HentJanzzYrkerDTO = z.infer<typeof hentJanzzYrkerSchema>;

export const useHentJanzzYrker = (query: string) => {
    const shouldFetch = query.length > 1;
    const endpoint = shouldFetch
        ? `${hentJanzzYrkerEndepunkt}?stillingstittel=${encodeURIComponent(query)}`
        : null;
    return useSWR(endpoint, getAPIwithSchema(hentJanzzYrkerSchema));
};

export interface JanzzStilling {
    label: string;
    konseptId: number;
}
