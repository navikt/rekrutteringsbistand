/**
 * Endepunkt /kandidatsok-api/api/enkel-autocomplete
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { postApi } from '../fetcher';
import { Geografiforslag } from '../../kandidatsok/filter/jobbønsker/ØnsketSted';

export const enkelAutocompleteEndepunkt = '/kandidatsok-api/api/enkel-autocomplete';

export interface EnkelAutocompleteProps {
    felt: string;
    prefix: string;
}

export type EnkelAutocompleteDTO = {
    geografiforslag: Geografiforslag[];
    isLoading: boolean;
    error?: Error;
};

export const useEnkelAutocomplete = (props: EnkelAutocompleteProps): EnkelAutocompleteDTO => {
    const swrKey = props.prefix.length >= 2 ? { path: enkelAutocompleteEndepunkt, props } : null;

    const swrData = useSWR(swrKey, ({ path }) => postApi(path, props));
    const geografiforslag = swrData?.data?.suggest?.forslag[0]?.options?.map(
        (option: { _source: Geografiforslag }) => option._source
    );
    return {
        ...swrData,
        geografiforslag,
    };
};

export const enkelAutocompleteMockMsw = http.post(enkelAutocompleteEndepunkt, (_) =>
    HttpResponse.json({
        suggest: {
            forslag: [
                {
                    options: [
                        {
                            _source: {
                                geografiKodeTekst: 'Oslo',
                                geografiKode: 'NO03.0301',
                            },
                        },
                        {
                            _source: {
                                geografiKodeTekst: 'Oslo/Bydel Alna',
                                geografiKode: 'NO03.03017',
                            },
                        },
                        {
                            _source: {
                                geografiKodeTekst: 'Oslo/Bydel Bjerke',
                                geografiKode: 'NO03.030112',
                            },
                        },
                    ],
                },
            ],
        },
    })
);
