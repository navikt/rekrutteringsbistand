import { http, HttpResponse } from 'msw';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { z } from 'zod';
import { mockKandidatlisteMedStilling } from '../../../mock/kandidat-api/mockKandidatliste';
import { mockVeileder } from '../../../mock/mockVeileder';
import { fetchJson, postJson } from '../../kandidat/api/fetchUtils';

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

export enum MinsideStatus {
    /** Det kommer ingen beskjed på min side, fordi varselet ble
     * opprettet før vi hadde minside-integrasjon. */
    IKKE_BESTILT = 'IKKE_BESTILT',

    /** Vi jobber med å få opprettet beskjeden  på minside. */
    UNDER_UTSENDING = 'UNDER_UTSENDING',

    /** Minside har bekreftet av de har opprettet beskjeden. */
    OPPRETTET = 'OPPRETTET',

    /** Beskjeden er slettet og ikke lenger synlig for bruker eller saksbehandler. */
    SLETTET = 'SLETTET',
}

export enum EksternKanal {
    SMS = 'SMS',
    EPOST = 'EPOST',
}

const MinsideStatusSchema = z
    .literal(MinsideStatus.IKKE_BESTILT)
    .or(z.literal(MinsideStatus.UNDER_UTSENDING))
    .or(z.literal(MinsideStatus.OPPRETTET))
    .or(z.literal(MinsideStatus.SLETTET));

const EksternKanalSchema = z
    .literal(null)
    .or(z.literal(EksternKanal.SMS))
    .or(z.literal(EksternKanal.EPOST));

export enum EksternStatus {
    /** Vi jobber med å sende ut eksternt varsel. Status er ikke avklart enda. */
    UNDER_UTSENDING = 'UNDER_UTSENDING',

    /** Vi har fått bekreftet at en SMS er sendt. */
    VELLYKKET_SMS = 'VELLYKKET_SMS',

    /** Vi har fått bekreftet at en e-post er sendt. */
    VELLYKKET_EPOST = 'VELLYKKET_EPOST',

    /** Varsling er ferdigstilt*/
    FERDIGSTILT = 'FERDIGSTILT',

    /** Det skjedde en feil, og vi vil ikke prøve å sende varselet igjen. */
    FEIL = 'FEIL',
}

const EksternStatusSchema = z
    .literal(EksternStatus.UNDER_UTSENDING)
    .or(z.literal(EksternStatus.VELLYKKET_SMS))
    .or(z.literal(EksternStatus.VELLYKKET_EPOST))
    .or(z.literal(EksternStatus.FERDIGSTILT))
    .or(z.literal(EksternStatus.FEIL));

const SmsSchema = z
    .object({
        id: z.string(),
        opprettet: z.string(),
        mottakerFnr: z.string(),
        stillingId: z.string(),
        avsenderNavident: z.string(),
        minsideStatus: MinsideStatusSchema,
        eksternStatus: EksternStatusSchema,
        eksternFeilmelding: z.string().nullable(),
        eksternKanal: EksternKanalSchema,
    })
    .partial({ eksternFeilmelding: true });

export type Sms = z.infer<typeof SmsSchema>;

const SmsArraySchema = z.array(SmsSchema);

export const useSmserForStilling = (
    stillingId: string | null | undefined
): SWRResponse<Record<string, Sms>> =>
    useSWR(
        stillingId ? varselStillingEndepunkt(stillingId) : null,
        async (url: string) => {
            const rawResponse = await fetchJson(url);
            const parsedResponse = SmsArraySchema.parse(rawResponse);
            const smser: Record<string, Sms> = {};
            parsedResponse.forEach((sms) => {
                smser[sms.mottakerFnr] = sms;
            });
            return smser;
        },
        {
            refreshInterval: 3_000,
        }
    );

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
export const kandidatvarselMock = [
    http.post<{ stillingId: string }>(
        varselStillingEndepunkt(':stillingId'),
        () => new HttpResponse(null, { status: 201 })
    ),

    http.get<{ stillingId: string }>(varselStillingEndepunkt(':stillingId'), async ({ params }) => {
        const { stillingId } = params;

        if (stillingId === 'minIntern') {
            return HttpResponse.json([
                {
                    id: 'minIntern',
                    stillingId: 'minIntern',
                    mottakerFnr: '14114536327',
                    avsenderNavident: mockVeileder.navIdent,
                    opprettet: new Date().toISOString(),
                    minsideStatus: MinsideStatus.OPPRETTET,
                    eksternStatus: EksternStatus.VELLYKKET_SMS,
                    eksternKanal: EksternKanal.SMS,
                },
            ]);
        }

        const sms = mockSms.filter((sms) => sms.stillingId === stillingId);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),

    http.post<object, smserForKandidatRequest>(varselQueryEndepunkt, async ({ request }) => {
        const { fnr } = await request.json();
        const sms = mockSms.filter((sms) => sms.mottakerFnr === fnr);

        if (!sms) {
            return new HttpResponse(null, { status: 404 });
        } else {
            return HttpResponse.json(sms);
        }
    }),
];

const smsExampleMock = {
    id: '1',
    stillingId: mockKandidatlisteMedStilling.stillingId as string,
    mottakerFnr: '14114536327', //mockKandidatlisteMedStilling.kandidater[0].fodselsnr,
    avsenderNavident: mockVeileder.navIdent,
    opprettet: new Date().toISOString(),
    minsideStatus: MinsideStatus.OPPRETTET,
    eksternStatus: EksternStatus.VELLYKKET_SMS,
    eksternKanal: EksternKanal.SMS,
};

const mockSms: Sms[] = [smsExampleMock];
