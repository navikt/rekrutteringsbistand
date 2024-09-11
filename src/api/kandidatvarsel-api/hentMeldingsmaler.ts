/**
 * Endepunkt /api/meldingsmal
 */
import useSWR, { SWRResponse } from 'swr';
import { getAPI } from '../fetcher';
import { http, HttpResponse } from 'msw';

const hentMeldingsmalerEndepunkt = '/kandidatvarsel-api/api/meldingsmal';

export type VurdertSomAktuell = {
    smsTekst: string;
    epostTittel: string;
    epostHtmlBody: string;
};

export type PassendeStilling = {
    smsTekst: string;
    epostTittel: string;
    epostHtmlBody: string;
};

export type PassendeJobbarrangement = {
    smsTekst: string;
    epostTittel: string;
    epostHtmlBody: string;
};

export type MeldingsmalerDTO = {
    vurdertSomAktuell: VurdertSomAktuell;
    passendeStilling: PassendeStilling;
    passendeJobbarrangement: PassendeJobbarrangement;
};

export const useHentMeldingsmaler = (): SWRResponse<MeldingsmalerDTO> => {
    return useSWR<MeldingsmalerDTO>(hentMeldingsmalerEndepunkt, getAPI);
};

export const hentMeldingsmalerMock = [
    http.get(hentMeldingsmalerEndepunkt, async () => {
        return HttpResponse.json([
            {
                vurdertSomAktuell: {
                    smsTekst:
                        'Hei! Vi har vurdert at kompetansen din kan passe til en stilling. Logg inn på NAV for å se stillingen. Vennlig hilsen NAV',
                    epostTittel: 'Stilling som kan passe for deg?',
                    epostHtmlBody:
                        '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Vi har vurdert at kompetansen din kan passe til en stilling. Logg inn på NAV for å se stillingen.</p><p>Vennlig hilsen</p><p>NAV</p></body></html>',
                },
                passendeStilling: {
                    smsTekst:
                        'Hei! Vi har funnet en stilling som kan passe deg. Logg inn på NAV for å se stillingen. Vennlig hilsen NAV',
                    epostTittel: 'Stilling som kan passe for deg?',
                    epostHtmlBody:
                        '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Vi har funnet en stilling som kanskje kan passe for deg. Logg inn på NAV for å se stillingen.</p><p>Vennlig hilsen</p><p>NAV</p></body></html>',
                },
                passendeJobbarrangement: {
                    smsTekst:
                        'Hei! Vi har funnet et jobbarrangement som kanskje passer for deg. Logg inn på NAV for å se arrangementet. Vennlig hilsen NAV',
                    epostTittel: 'Jobbarrangement',
                    epostHtmlBody:
                        '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Vi har funnet et jobbarrangement som kanskje passer for deg. Logg inn på NAV for å se arrangementet.</p><p>Vennlig hilsen</p><p>NAV</p></body></html>',
                },
            },
        ]);
    }),
];
