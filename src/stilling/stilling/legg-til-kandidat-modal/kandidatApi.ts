import { ApiError } from '../../api/apiUtils';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidat, Kandidatliste, Synlighetsevaluering } from './kandidatlistetyper';
import { KandidatOutboundDto } from './LeggTilKandidatModal';

export const KANDIDAT_API = '/kandidat-api';
export const SYNLIGHET_API = `/synlighet-api`;

export const fetchSynlighetsevaluering = async (
    fødselsnummer: string
): Promise<Nettressurs<Synlighetsevaluering>> => {
    const url = `${SYNLIGHET_API}/evaluering/${fødselsnummer}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const body = await response.json();

            return {
                kind: Nettstatus.Suksess,
                data: body,
            };
        } else {
            throw new ApiError(await response.text(), response.status);
        }
    } catch (e) {
        if (e instanceof ApiError) {
            return {
                kind: Nettstatus.Feil,
                error: e,
            };
        }

        return {
            kind: Nettstatus.Feil,
            error: new ApiError('Ukjent feil', 0),
        };
    }
};

export class KandidatSokError {
    message: string;
    status: number;

    constructor(error) {
        this.message = error.message;
        this.status = error.status;
    }
}

export const postKandidaterTilKandidatliste = async (
    kandidatlisteId: string,
    kandidater: KandidatOutboundDto[]
): Promise<Nettressurs<Kandidatliste>> => {
    const url = `${KANDIDAT_API}/veileder/kandidatlister/${kandidatlisteId}/kandidater`;

    try {
        const body = await postJson(url, JSON.stringify(kandidater));

        return {
            kind: Nettstatus.Suksess,
            data: body,
        };
    } catch (e) {
        return {
            kind: Nettstatus.Feil,
            error: e,
        };
    }
};

export const fetchKandidatMedFnr = async (fnr: string): Promise<Nettressurs<Kandidat>> => {
    const url = `${KANDIDAT_API}/veileder/kandidatsok/fnrsok`;
    const body = JSON.stringify({ fnr });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body,
            mode: 'cors',
            credentials: 'include',
            headers: postHeaders(),
        });

        if (response.ok) {
            return {
                kind: Nettstatus.Suksess,
                data: await response.json(),
            };
        } else if (response.status === 404) {
            return {
                kind: Nettstatus.FinnesIkke,
            };
        } else {
            throw await response.text();
        }
    } catch (e) {
        return {
            kind: Nettstatus.Feil,
            error: e,
        };
    }
};

export const putKandidatliste = (stillingsId: string): Promise<Kandidatliste> =>
    putRequest(`${KANDIDAT_API}/veileder/stilling/${stillingsId}/kandidatliste`);

export const fetchKandidatliste = (stillingsId: string): Promise<Kandidatliste> =>
    fetchJson(`${KANDIDAT_API}/veileder/stilling/${stillingsId}/kandidatliste`);

const postHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        Accept: 'application/json',
    };
};

async function postJson(url, bodyString) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: bodyString,
            headers: postHeaders(),
            mode: 'cors',
        });
        if (response.status === 200 || response.status === 201) {
            return response.json();
        }
        throwError(undefined, response.status);
    } catch (e) {
        throwError(e.message, e.status);
    }
}

async function fetchJson(url) {
    try {
        const response = await fetch(url, { credentials: 'include' });
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        let error;
        try {
            error = await response.json();
        } catch (e) {
            throwError(response.statusText, response.status);
        }
        throwError(error.message, error.status);
    } catch (e) {
        throwError(e.message, e.status);
    }
}

async function putRequest(url: string) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            },
            mode: 'cors',
        });

        if (response.ok) {
            return await response.json();
        }

        throwError(undefined, response.status);
    } catch (e) {
        throwError(e.message, e.status);
    }
}

const throwError = (message?: string, status?: number) => {
    throw new KandidatSokError({ message, status });
};

const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};
