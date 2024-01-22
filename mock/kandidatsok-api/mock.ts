import { HttpResponse, http } from 'msw';
import { endepunkter } from '../../src/kandidat/api/api';
import { mockKandidat } from '../kandidatsok-proxy/mockKandidat';

export const kandidatSokApiMock = [
    http.post(`${endepunkter.lookupCv}`, (_) =>
        HttpResponse.json({
            hits: {
                hits: [
                    {
                        _source: mockKandidat,
                    },
                ],
            },
        })
    ),
];
