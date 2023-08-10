import { Sms, SmsStatus } from 'felles/domene/sms/Sms';
import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { mockKandidatlisteMedStilling } from '../kandidat-api/mockKandidatliste';
import { mockMeg } from '../meg/mock';

export const smsApiMock = [
    rest.get(`${api.sms}/:kandidatlisteId`, (req, res, ctx) => {
        const sms = mockSms.filter((sms) => sms.kandidatlisteId === req.params.kandidatlisteId);

        if (!sms) {
            return res(ctx.status(404));
        } else {
            return res(ctx.json(sms));
        }
    }),

    rest.get(`${api.sms}/fnr/:fnr`, (req, res, ctx) => {
        const sms = mockSms.filter((sms) => sms.fnr === req.params.fnr);

        if (!sms) {
            return res(ctx.status(404));
        } else {
            return res(ctx.json(sms));
        }
    }),

    rest.post(`${api.sms}`, (_, res, ctx) => res(ctx.status(201))),
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
