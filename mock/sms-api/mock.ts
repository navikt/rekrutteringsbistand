import { Sms, SmsStatus } from 'felles/domene/sms/Sms';
import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import { mockKandidatlisteMedStilling } from '../kandidat-api/mockKandidatliste';
import { mockMeg } from '../meg/mock';

export const smsApiMock = [
    http.get(`${api.sms}/:kandidatlisteId`, ({ params }) => {
        const { kandidatlisteId } = params;
        const sms = mockSms.filter((sms) => sms.kandidatlisteId === kandidatlisteId);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),

    http.get(`${api.sms}/fnr/:fnr`, ({ params }) => {
        const { fnr } = params;
        const sms = mockSms.filter((sms) => sms.fnr === fnr);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),

    http.post(`${api.sms}`, () => new HttpResponse(null, { status: 201 })),
];

const mockSms: Sms[] = [
    {
        id: 1,
        kandidatlisteId: mockKandidatlisteMedStilling.kandidatlisteId,
        fnr: '123', //mockKandidatlisteMedStilling.kandidater[0].fodselsnr,
        opprettet: new Date().toISOString(),
        sendt: new Date().toISOString(),
        status: SmsStatus.Sendt,
        navIdent: mockMeg.navIdent,
    },
];
