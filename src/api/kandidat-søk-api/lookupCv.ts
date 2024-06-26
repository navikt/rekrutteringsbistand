/**
 * Endepunkt /kandidatsok-api/api/lookupCv
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidat } from '../../../mock/kandidat-api/mockKandidat';
import { postApi } from '../fetcher';

const lookupCvEndepunkt = '/kandidatsok-api/api/lookup-cv';

export const useLookupCv = (kandidatnr?: string) => {
    const swrData = useSWR({ path: lookupCvEndepunkt, kandidatnr }, ({ path }) =>
        postApi(path, { kandidatnr })
    );

    const cv = swrData?.data?.hits?.hits[0]?._source;

    return { ...swrData, cv };
};

export const lookupCvMockMsw = http.post(lookupCvEndepunkt, async ({ request }) => {
    const body = (await request.json()) as { kandidatnr: string };

    if (body?.kandidatnr === 'utenTilgang') {
        return HttpResponse.json('forbidden' as any, { status: 403 });
    }
    return HttpResponse.json({
        hits: {
            hits: [
                {
                    _source: mockKandidat,
                },
            ],
        },
    });
});
