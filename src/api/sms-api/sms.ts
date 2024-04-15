import { z } from 'zod';
import { http, HttpResponse } from 'msw';
import { mockKandidatlisteMedStilling } from '../../../mock/kandidat-api/mockKandidatliste';
import { mockVeileder } from '../../../mock/mockVeileder';
import { fetchJson, postJson } from '../../kandidat/api/fetchUtils';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';

const varselStillingEndepunkt = (stillingId: string) => {
    if (stillingId === undefined) throw new Error('stillingId === undefined');
    return `/kandidatvarsel-api/api/varsler/stilling/${stillingId}`;
};
const varselQueryEndepunkt = '/kandidatvarsel-api/api/varsler/query';

export enum Meldingsmal {
    VurdertSomAktuell = 'VURDERT_SOM_AKTUELL',
    FunnetPassendeStilling = 'PASSENDE_STILLING',
    Jobbarrangement = 'PASSENDE_JOBBARRANGEMENT',
    // EtterspurtPgaKorona = 'etterspurt_pga_korona',
    // Webinar = 'webinar',
}

export enum SmsStatus {
    UnderUtsending = 'UNDER_UTSENDING',
    Sendt = 'SENDT',
    Feil = 'FEIL',
}

const SmsStatusSchema = z
    .literal(SmsStatus.UnderUtsending)
    .or(z.literal(SmsStatus.Sendt))
    .or(z.literal(SmsStatus.Feil));

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

export const useSmserForStilling = (
    stillingId: string | null | undefined
): SWRResponse<Record<string, Sms>> =>
    useSWR(stillingId ? varselStillingEndepunkt(stillingId) : null, async (url: string) => {
        const rawResponse = await fetchJson(url);
        const parsedResponse = SmsArraySchema.parse(rawResponse);
        const smser: Record<string, Sms> = {};
        parsedResponse.forEach((sms) => {
            smser[sms.fnr] = sms;
        });
        return smser;
    });

type smserForKandidatRequest = { fnr: string | undefined | null };

export const useSmserForKandidat = ({ fnr }: smserForKandidatRequest): SWRResponse<Sms[]> =>
    useSWR(
        typeof fnr === 'string' ? { url: varselQueryEndepunkt, fnr } : null,
        async ({ url, fnr }) => SmsArraySchema.parse(await postJson(url, JSON.stringify({ fnr })))
    );

type postSmsTilKandidaterRequest = {
    mal: Meldingsmal;
    fnr: string[];
    stillingId: string;
};

export const usePostSmsTilKandidater = (): (({
    mal,
    fnr,
    stillingId,
}: postSmsTilKandidaterRequest) => Promise<'ok' | 'error'>) => {
    const { mutate } = useSWRConfig();

    return async ({ stillingId, mal, fnr }) => {
        let result: 'ok' | 'error' = 'ok';
        try {
            await postJson(
                varselStillingEndepunkt(stillingId),
                JSON.stringify({
                    mal,
                    fnr,
                })
            );
        } catch (e) {
            result = 'error';
        }

        mutate(varselStillingEndepunkt(stillingId)).then();
        mutate(
            (key) =>
                key !== null &&
                typeof key === 'object' &&
                'url' in key &&
                key.url === varselQueryEndepunkt
        ).then();
        return result;
    };
};
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
        status: SmsStatus.Sendt,
        navIdent: mockVeileder.navIdent,
    },
];
