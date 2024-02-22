/**
 * Endepunkt /kandidatsok-api/api/enkel-autocomplete
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { postApi } from '../fetcher';

export const enkelAutocompleteEndepunkt = '/kandidatsok-api/api/enkel-autocomplete';

export interface EnkelAutocompleteProps {
    felt: string;
}

export type EnkelAutocompleteDTO = {
    tekst: string;
    isLoading: boolean;
    error?: Error;
};

export const useEnkelAutocomplete = (props: EnkelAutocompleteProps) => {
    const swrData = useSWR({ path: enkelAutocompleteEndepunkt, props }, ({ path }) =>
        postApi(path, props)
    );
    const enkelAutocomplete: EnkelAutocompleteDTO = swrData?.data?.suggest?.forslag[0]?.options.map(
        (option: { text: string }) => option.text
    );
    return {
        ...swrData,
        enkelAutocomplete,
    };
};

export const enkelAutocompleteMockMsw = http.post(enkelAutocompleteEndepunkt, (_) =>
    HttpResponse.json({
        suggest: {
            forslag: [
                {
                    options: [
                        {
                            text: 'Autocomplete1',
                        },
                        {
                            text: 'Autocomplete2',
                        },
                        {
                            text: 'Autocomplete3',
                        },
                    ],
                },
            ],
        },
    })
);
