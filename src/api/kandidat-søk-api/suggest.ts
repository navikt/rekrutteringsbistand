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
    type: SuggestType;
}

export enum SuggestType {
    ØnsketYrke,
    Kompetanse,
    Arbeidserfaring,
    Språk,
}

export const useSuggest = (props: SuggestProps) => {
    const swr = useSWR({ path: suggestEndepunkt, props }, ({ path }) => postApi(path, props));

    if (props.query.length < 3) {
        return {
            data: [],
            error: undefined,
            isValidating: false,
            revalidate: () => {},
            mutate: () => {},
            suggestions: [],
        };
    }

    return {
        ...swr,
        suggestions: swr?.data ? suggestionsSchema.parse(swr?.data) : [],
    };
};

export const suggestMockMsw = http.post(suggestEndepunkt, async ({ request }) => {
    const { type } = (await request.json()) as SuggestProps;
    if (type === SuggestType.ØnsketYrke) {
        return HttpResponse.json(['Matematiker', 'Ingeniør', 'Kokk']);
    } else if (type === SuggestType.Kompetanse) {
        return HttpResponse.json(['matematikk', 'fysikk', 'baking']);
    } else if (type === SuggestType.Arbeidserfaring) {
        return HttpResponse.json(['Matematiker', 'Ingeniør', 'Kokk']);
    } else if (type === SuggestType.Språk) {
        return HttpResponse.json(['Norsk', 'Svensk', 'Engelsk']);
    } else {
        return undefined;
    }
});
