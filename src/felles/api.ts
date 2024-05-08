import { erIkkeProd } from './miljø';
import { Nettressurs, Nettstatus } from './nettressurs';

export const api = {
    statistikk: '/statistikk-api',
    stillingssøk: '/stillingssok-proxy',
    stilling: '/stilling-api',
    synlighet: '/synlighet-api',
    kandidat: '/kandidat-api',
    forespørselOmDelingAvCv: '/foresporsel-om-deling-av-cv-api',
    presenterteKandidaterApi: '/presenterte-kandidater-api',
    modiaContextHolder: '/modiacontextholder/api',
    arbeidsgiverNotifikasjon: '/arbeidsgiver-notifikasjon-api',
    kandidatSokApi: '/kandidatsok-api',
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

        if (erIkkeProd) {
            console.log('response: ', response);
        }

        if (response.status === 200 || response.status === 201) {
            return {
                kind: Nettstatus.Suksess,
                data: (await parseBody(response)) as Returtype,
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
                message: 'Nettverksfeil: ' + e,
            },
        };
    }
};

export const get = async <Returtype>(url: string): Promise<Nettressurs<Returtype>> => {
    try {
        const response = await fetch(url);

        if (response.status === 200) {
            return {
                kind: Nettstatus.Suksess,
                data: (await parseBody(response)) as Returtype,
            };
        } else if (response.status === 404) {
            return {
                kind: Nettstatus.FinnesIkke,
            };
        } else {
            return {
                kind: Nettstatus.Feil,
                error: {
                    status: response.status,
                    message: response.statusText,
                },
            };
        }
    } catch (e) {
        return {
            kind: Nettstatus.Feil,
            error: {
                message: 'Nettverksfeil',
            },
        };
    }
};

const parseBody = async (response: Response) => {
    const contentType = response.headers.get('Content-Type');

    if (contentType !== null) {
        if (contentType.includes('application/json')) {
            return await response.json();
        } else if (contentType.includes('application/text')) {
            return await response.text();
        }
    }

    return null;
};
