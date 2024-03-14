/**
 * Endepunkt /kandidatsok-api/api/suggest/kontor
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';

const suggestKontorEndepunkt = '/kandidatsok-api/api/suggest/kontor';

export const suggestionsKontorlisteSchema = z.array(z.string());

export interface SuggestKontorProps {
    query: string;
}

export const useSuggestKontor = (props: SuggestKontorProps) => {
    const harNokTegn = props.query.length >= 2;
    const swr = useSWR(
        harNokTegn ? { path: suggestKontorEndepunkt, props } : undefined,
        ({ path }) => postApi(path, props)
    );

    return {
        ...swr,
        suggestions: swr?.data ? suggestionsKontorlisteSchema.parse(swr?.data) : [],
    };
};

export const suggestKontorMockMsw = http.post(suggestKontorEndepunkt, async (_) => {
    return HttpResponse.json(['NAV Hordaland', 'NAV Bergen', 'NAV Tønsberg']);
});
