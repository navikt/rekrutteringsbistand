import { api } from 'felles/api';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

export const hentJanzzYrkerEndepunkt = `${api.pamOntologi}/rest/typeahead/stilling`;

export const janzzStillingSchema = z.object({
    label: z.string(),
    konseptId: z.number(),
    styrk08: z.any().optional(),
    styrk08Label: z.any().optional(),
    esco: z.any().optional(),
    escoLabel: z.any().optional(),
    undertype: z.any().optional(),
});

const hentJanzzYrkerSchema = z.array(janzzStillingSchema);

export type JanzzStillingDTO = z.infer<typeof janzzStillingSchema>;
export type HentJanzzYrkerDTO = z.infer<typeof hentJanzzYrkerSchema>;

export const useHentJanzzYrker = (query: string) => {
    const shouldFetch = query.length > 1;
    const endpoint = shouldFetch
        ? `${hentJanzzYrkerEndepunkt}?stillingstittel=${encodeURIComponent(query)}`
        : null;

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache, no-store',
        'Nav-CallId': uuidv4(),
    };

    return useSWR(endpoint, getAPIwithSchema(hentJanzzYrkerSchema, headers));
};
