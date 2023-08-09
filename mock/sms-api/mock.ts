import { Sms, SmsStatus } from 'felles/domene/sms/Sms';
import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { meg } from '../../src/kandidat/mock/data/kandidat/veileder.mock';
import { mockKandidatlisteMedStilling } from '../kandidat-api/mockKandidatliste';

export const smsApiMock = [
    rest.get(`${api.sms}/:kandidatlisteId`, (req, res, ctx) => {
        const sms = mockSms.filter((sms) => sms.kandidatlisteId === req.params.kandidatlisteId);

        if (!sms) {
            return res(ctx.status(404));
        } else {
            return res(ctx.json(sms));
        }
    }),
];

const mockSms: Sms[] = [
    {
        id: 1,
        kandidatlisteId: mockKandidatlisteMedStilling.kandidatlisteId,
        fnr: '123', //mockKandidatlisteMedStilling.kandidater[0].fodselsnr,
        opprettet: new Date().toISOString(),
        sendt: new Date().toISOString(),
        status: SmsStatus.Sendt,
        navIdent: meg.ident,
    },
];
