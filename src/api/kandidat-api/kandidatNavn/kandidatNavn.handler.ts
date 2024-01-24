import { HttpResponse, http } from 'msw';
import { kandidatEndepunkter } from '../kandidat.api';
import { kandidatNavnMockGenerator } from './kandidatNavn.testdata';

export const kandidatNavnMockHandler = [
    http.post(kandidatEndepunkter.kandidatNavn, () =>
        HttpResponse.json([kandidatNavnMockGenerator()], { status: 200 })
    ),
];
