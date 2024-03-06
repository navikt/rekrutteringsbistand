import { z } from 'zod';
import { http, HttpResponse } from 'msw';
import { mockKandidatlisteMedStilling } from '../../../mock/kandidat-api/mockKandidatliste';
import { mockVeileder } from '../../../mock/mockVeileder';
import { fetchJson, postJson } from '../../kandidat/api/fetchUtils';

const getSmsKandidatlisteEndepunkt = (kandidatlisteId: string) => `/sms-api/${kandidatlisteId}`;
const getSmsFnrEndepunkt = (fnr: string) => `/sms-api/fnr/${fnr}`;

const postSmsEndepunkt = '/sms-api';

export enum SmsStatus {
    IkkeSendt = 'IKKE_SENDT',
    UnderUtsending = 'UNDER_UTSENDING',
    Sendt = 'SENDT',
    Feil = 'FEIL',
}

const SmsStatusSchema = z
    .literal(SmsStatus.IkkeSendt)
    .or(z.literal(SmsStatus.UnderUtsending))
    .or(z.literal(SmsStatus.Sendt))
    .or(z.literal(SmsStatus.Feil));

const SmsSchema = z.object({
    id: z.number().int(),
    opprettet: z.string(),
    sendt: z.string().nullable(),
    fnr: z.string(),
    kandidatlisteId: z.string(),
    navIdent: z.string(),
    status: SmsStatusSchema,
});

export type Sms = z.infer<typeof SmsSchema>;

const SmsArraySchema = z.array(SmsSchema);

/* Ikke skrevet om til useSwr siden disse brukes i redux-reducer */

export const fetchSendteMeldinger = (kandidatlisteId: string): Sms[] =>
    SmsArraySchema.parse(fetchJson(getSmsKandidatlisteEndepunkt(kandidatlisteId), true));

export const fetchSmserForKandidat = (fnr: string): Sms[] =>
    SmsArraySchema.parse(fetchJson(getSmsFnrEndepunkt(fnr), true));

export const postSmsTilKandidater = (melding: string, fnr: string[], kandidatlisteId: string) =>
    postJson(
        postSmsEndepunkt,
        JSON.stringify({
            melding,
            fnr,
            kandidatlisteId,
        })
    );

export const smsApiMock = [
    http.get(getSmsKandidatlisteEndepunkt(':kandidatlisteId'), ({ params }) => {
        const { kandidatlisteId } = params;
        const sms = mockSms.filter((sms) => sms.kandidatlisteId === kandidatlisteId);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),

    http.get(getSmsFnrEndepunkt(':fnr'), ({ params }) => {
        const { fnr } = params;
        const sms = mockSms.filter((sms) => sms.fnr === fnr);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),

    http.post(postSmsEndepunkt, () => new HttpResponse(null, { status: 201 })),
];

const mockSms: Sms[] = [
    {
        id: 1,
        kandidatlisteId: mockKandidatlisteMedStilling.kandidatlisteId,
        fnr: '123', //mockKandidatlisteMedStilling.kandidater[0].fodselsnr,
        opprettet: new Date().toISOString(),
        sendt: new Date().toISOString(),
        status: SmsStatus.Sendt,
        navIdent: mockVeileder.navIdent,
    },
];
