import { HttpResponse, http } from 'msw';
import { devFnr } from '../../../dev/DevUtil';
import { kandidatEndepunkter } from '../kandidat.api';
import { kandidatNavnMockGenerator } from './kandidatNavn.testdata';

export const kandidatNavnMockHandler = [
    http.post(kandidatEndepunkter.kandidatNavn, async ({ request }) => {
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
    }),
];
