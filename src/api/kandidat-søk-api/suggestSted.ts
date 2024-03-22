/**
 * Endepunkt /kandidatsok-api/api/suggest/sted
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const suggestStedEndepunkt = '/kandidatsok-api/api/suggest/sted';

export const suggestionsStedSchema = z.object({
    geografiKode: z.string(),
    geografiKodeTekst: z.string(),
});

export const suggestionsStederSchema = z.array(suggestionsStedSchema);
export type SuggestionsSted = z.infer<typeof suggestionsStedSchema>;
export type SuggestionsSteder = z.infer<typeof suggestionsStederSchema>;

export interface SuggestStedProps {
    query: string | null;
}

export const useSuggestSted = (props: SuggestStedProps) => {
    const harNokTegn = props.query && props.query.length >= 2;
    const swr = useSWR(harNokTegn ? { path: suggestStedEndepunkt, props } : undefined, ({ path }) =>
        postApi(path, props)
    );

    return {
        ...swr,
        suggestions: swr?.data ? suggestionsStederSchema.parse(swr?.data) : [],
    };
};

export const suggestStedMockMsw = http.post(suggestStedEndepunkt, async (_) => {
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
