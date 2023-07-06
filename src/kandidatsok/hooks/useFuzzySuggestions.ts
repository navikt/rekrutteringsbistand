import { useState } from 'react';
import { fuzzySuggest } from '../api/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import byggFuzzySuggestion from '../api/query/byggFuzzySuggestion';
import useDebouncedEffect from './useDebouncedEffect';

const minimumTekstlengde = 2;

const useFuzzySuggestions = (
    field: string,
    sourceField: string,
    query: string
): Nettressurs<string[]> => {
    const [suggestions, setSuggestions] = useState<Nettressurs<string[]>>({
        kind: Nettstatus.IkkeLastet,
    });

    useDebouncedEffect(() => {
        const hentSuggestions = async () => {
            try {
                const respons = await fuzzySuggest(byggFuzzySuggestion(field, sourceField, query));
                const forslagRespons = respons.aggregations.suggestions.buckets.map(
                    (bucket) => bucket.key
                );

                setSuggestions({
                    kind: Nettstatus.Suksess,
                    data: forslagRespons,
                });
            } catch (e) {
                setSuggestions({
                    kind: Nettstatus.Feil,
                    error: { message: e as string },
                });
            }
        };

        if (query.length >= minimumTekstlengde) {
            hentSuggestions();
        }
    }, [query, field, sourceField, setSuggestions]);

    return suggestions;
};

export default useFuzzySuggestions;
