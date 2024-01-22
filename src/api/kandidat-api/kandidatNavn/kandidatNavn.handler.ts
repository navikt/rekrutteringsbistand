import { HttpResponse, http } from 'msw';
import { endepunkter } from '../../../kandidat/api/api';
import { kandidatNavnMockGenerator } from './kandidatNavn.testdata';

export const kandidatNavnMockHandler = [
    http.post(endepunkter.kandidatNavn, () =>
        HttpResponse.json([kandidatNavnMockGenerator()], { status: 200 })
    ),
];
