import { z } from 'zod';
import { http, HttpResponse } from 'msw';
import { mockKandidatlisteMedStilling } from '../../../mock/kandidat-api/mockKandidatliste';
import { mockVeileder } from '../../../mock/mockVeileder';
import { fetchJson, postJson } from '../../kandidat/api/fetchUtils';

const varselStillingEndepunkt = (stillingId: string) =>
    `/kandidatvarsel-api/varsel/stilling/${stillingId}`;
const varselQueryEndepunkt = '/kandidatvarsel-api/varsel/query';

export enum Meldingsmal {
    VurdertSomAktuell = 'VURDERT_SOM_AKTUELL',
    FunnetPassendeStilling = 'PASSENDE_STILLING',
    Jobbarrangement = 'PASSENDE_JOBBARRANGEMENT',
    // EtterspurtPgaKorona = 'etterspurt_pga_korona',
    // Webinar = 'webinar',
}

export enum ServerSmsStatus {
    UnderUtsending = 'UNDER_UTSENDING',
    Sendt = 'SENDT',
    Feil = 'FEIL',
}

const SmsStatusSchema = z
    .literal(ServerSmsStatus.UnderUtsending)
    .or(z.literal(ServerSmsStatus.Sendt))
    .or(z.literal(ServerSmsStatus.Feil));

const SmsSchema = z.object({
    id: z.string(),
    opprettet: z.string(),
    fnr: z.string(),
    stillingId: z.string(),
    navIdent: z.string(),
    status: SmsStatusSchema,
});

export type Sms = z.infer<typeof SmsSchema>;

const SmsArraySchema = z.array(SmsSchema);

/* Ikke skrevet om til useSwr siden disse brukes i redux-reducer */

type smserForStillingRequest = { stillingId: string };
export const fetchSmserForStilling = async ({
    stillingId,
}: smserForStillingRequest): Promise<Sms[]> =>
    SmsArraySchema.parse(await fetchJson(varselStillingEndepunkt(stillingId)));

type smserForKandidatRequest = { fnr: string };
export const fetchSmserForKandidat = async ({ fnr }: smserForKandidatRequest): Promise<Sms[]> =>
    SmsArraySchema.parse(await postJson(varselQueryEndepunkt, JSON.stringify({ fnr })));

type postSmsTilKandidaterRequest = {
    mal: Meldingsmal;
    fnr: string[];
    stillingId: string;
};
export const postSmsTilKandidater = ({
    mal,
    fnr,
    stillingId,
}: postSmsTilKandidaterRequest): Promise<void> =>
    postJson(
        varselStillingEndepunkt(stillingId),
        JSON.stringify({
            mal,
            fnr,
        })
    );

export const smsApiMock = [
    http.post<{ stillingId: string }>(
        varselStillingEndepunkt(':stillingId'),
        () => new HttpResponse(null, { status: 201 })
    ),

    http.get<{ stillingId: string }>(varselStillingEndepunkt(':stillingId'), async ({ params }) => {
        const { stillingId } = params;
        const sms = mockSms.filter((sms) => sms.stillingId === stillingId);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),

    http.post<{}, smserForKandidatRequest>(varselQueryEndepunkt, async ({ request }) => {
        const { fnr } = await request.json();
        const sms = mockSms.filter((sms) => sms.fnr === fnr);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),
];

const mockSms: Sms[] = [
    {
        id: '1',
        stillingId: mockKandidatlisteMedStilling.stillingId!,
        fnr: '14114536327', //mockKandidatlisteMedStilling.kandidater[0].fodselsnr,
        opprettet: new Date().toISOString(),
        status: ServerSmsStatus.Sendt,
        navIdent: mockVeileder.navIdent,
    },
];
