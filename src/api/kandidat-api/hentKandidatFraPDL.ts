import { HttpResponse, http } from 'msw';
import { kandidatNavnMockGenerator } from '../../../mock/kandidat-api/mockKandidatNavn';
import { devFnr } from '../../dev/DevUtil';
import { postApiResponse } from '../fetcher';

const hentKanidatNavnFraPDLEndepukt = `/kandidat-api/veileder/kandidater/navn`;

export const hentKandidatFraPDL = async (fnr: string) => {
    return await postApiResponse(hentKanidatNavnFraPDLEndepukt, { fnr });
};

export const hentKandidatFraPDLMockMsw = http.post(
    hentKanidatNavnFraPDLEndepukt,
    async ({ request }) => {
        const data = await request.json();

        //@ts-ignore
        const fnrRequest = data.fnr;

        const ingenTreff = devFnr.finnesIkke === fnrRequest;

        return ingenTreff
            ? new HttpResponse('Not found', {
                  status: 404,
                  headers: {
                      'Content-Type': 'text/plain',
                  },
              })
            : HttpResponse.json([kandidatNavnMockGenerator()], { status: 200 });
    }
);
