import { HttpResponse, http } from 'msw';
import { kandidatSøkEndepunkter } from '../../src/api/kandidat-søk-api/kandidat-søk.api';
import { mockKandidat } from '../kandidatsok-proxy/mockKandidat';

export const kandidatSokApiMock = [
    http.post(`${kandidatSøkEndepunkter.lookupCv}`, (_) =>
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
    http.post(`${kandidatSøkEndepunkter.kandidatsammendrag}`, (_) =>
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
