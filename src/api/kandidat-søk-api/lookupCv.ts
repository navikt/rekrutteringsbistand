/**
 * Endepunkt /kandidatsok-api/api/lookupCv
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidat } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';

const lookupCvEndepunkt = '/kandidatsok-api/api/lookupCv';

export const useLookupCv = (kandidatnr?: string) => {
    const swrData = useSWR({ path: lookupCvEndepunkt, kandidatnr }, ({ path }) =>
        postApi(path, { kandidatnr })
    );

    const cv = swrData?.data?.hits?.hits[0]?._source;

    return { ...swrData, cv };
};

export const lookupCvMockMsw = http.post(lookupCvEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: [
                {
                    _source: mockKandidat,
                },
            ],
        },
    })
);
