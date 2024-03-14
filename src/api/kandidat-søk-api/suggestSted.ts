/**
 * Endepunkt /kandidatsok-api/api/suggest/sted
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const suggestStedEndepunkt = '/kandidatsok-api/api/suggest/sted';

export const suggestionsStedSchema = z.array(
    z.object({ geografiKode: z.string(), geografiKodeTekst: z.string() })
);
export type SuggestionsSted = z.infer<typeof suggestionsStedSchema>;

export interface SuggestStedProps {
    query: string;
}

export const useSuggestSted = (props: SuggestStedProps) => {
    const harNokTegn = props.query.length >= 3;
    const swr = useSWR(harNokTegn ? { path: suggestStedEndepunkt, props } : undefined, ({ path }) =>
        postApi(path, props)
    );

    return {
        ...swr,
        suggestions: swr?.data ? suggestionsStedSchema.parse(swr?.data) : [],
    };
};

export const suggestMockMsw = http.post(suggestStedEndepunkt, async (_) => {
    return HttpResponse.json([
        {
            geografiKode: 'NO12',
            geografiKodeTekst: 'Hordaland',
        },
        {
            geografiKode: 'NO46.4601',
            geografiKodeTekst: 'Bergen',
        },
        {
            geografiKode: 'NO38.3803',
            geografiKodeTekst: 'Tønsberg',
        },
    ]);
});
