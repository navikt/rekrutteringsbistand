import { Nettressurs, Nettstatus } from './nettressurs';

export const api = {
    innloggetBruker: '/meg',
    statistikk: '/statistikk-api',
    stillingssøk: '/stillingssok-proxy',
    stilling: '/stilling-api',
    sms: '/sms-api',
    synlighet: '/synlighet-api',
    kandidat: '/kandidat-api',
    kandidatsøk: '/kandidatsok-proxy',
    forespørselOmDelingAvCv: '/foresporsel-om-deling-av-cv-api',
    presenterteKandidaterApi: '/presenterte-kandidater-api',
};

export const videresendTilInnlogging = () => {
    window.location.href = `/oauth2/login?redirect=${window.location.pathname}`;
};

export const post = async <Returtype>(
    url: string,
    body: object
): Promise<Nettressurs<Returtype>> => {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200 || response.status === 201) {
            return {
                kind: Nettstatus.Suksess,
                data: (await response.json()) as Returtype,
            };
        }

        return {
            kind: Nettstatus.Feil,
            error: {
                status: response.status,
                message: response.statusText,
            },
        };
    } catch (e) {
        return {
            kind: Nettstatus.Feil,
            error: {
                status: undefined,
                message: 'Nettverksfeil',
            },
        };
    }
};
