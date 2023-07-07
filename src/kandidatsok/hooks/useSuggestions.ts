import { useState } from 'react';
import { suggest } from '../api/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import byggSuggestion, { Forslagsfelt } from '../api/query/byggSuggestion';
import useDebouncedEffect from './useDebouncedEffect';

const minimumTekstlengde = 2;

const useSuggestions = (field: Forslagsfelt, prefix: string) => {
    const [suggestions, setSuggestions] = useState<Nettressurs<string[]>>({
        kind: Nettstatus.IkkeLastet,
    });

    useDebouncedEffect(() => {
        const hentSuggestions = async () => {
            try {
                const respons = await suggest(byggSuggestion(field, prefix));
                const forslagRespons = respons.suggest.forslag;

                if (forslagRespons.length === 0) {
                    throw Error('Kunne ikke bruke forslag');
                }

                const forslag = forslagRespons[0].options.map((option) => option.text);

                setSuggestions({
                    kind: Nettstatus.Suksess,
                    data: forslag,
                });
            } catch (e) {
                setSuggestions({
                    kind: Nettstatus.Feil,
                    error: { message: e as string },
                });
            }
        };

        if (prefix.length >= minimumTekstlengde) {
            hentSuggestions();
        }
    }, [field, prefix, setSuggestions]);

    return suggestions;
};

export default useSuggestions;
