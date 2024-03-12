/**
 * Endepunkt /kandidatsok-api/api/suggest
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const suggestEndepunkt = '/kandidatsok-api/api/suggest';

export const suggestionsSchema = z.array(z.string());
export type Suggestions = z.infer<typeof suggestionsSchema>;

export interface SuggestProps {
    query: string;
    type: string;
}

export const useSuggest = (props: SuggestProps) => {
    const swr = useSWR({ path: suggestEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    const suggestionsData: Suggestions | undefined = swr?.data
        ? suggestionsSchema.parse(swr?.data)
        : undefined;

    return {
        ...swr,
        suggestions: suggestionsData,
    };
};

export const suggestMockMsw = http.post(suggestEndepunkt, (_) =>
    HttpResponse.json(['suggestion1', 'suggestion2', 'suggestion3'])
);
