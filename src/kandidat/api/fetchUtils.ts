import { videresendTilInnlogging } from 'felles/api';
import { feil, Nettressurs, suksess } from 'felles/nettressurs';

export const createCallIdHeader = () => ({
    'Nav-CallId': Math.random().toString(16).substring(2),
});

export class SearchApiError {
    message: string;
    status: number;
    constructor(error: any) {
        this.message = error.message;
        this.status = error.status;
    }
}

export async function fetchJson(url: string, includeCredentials = false) {
    try {
        let response;
        if (includeCredentials) {
            response = await fetch(url, {
                credentials: 'include',
                headers: createCallIdHeader(),
            });
        } else {
            response = await fetch(url, { headers: createCallIdHeader() });
        }
        if (response.status === 200 || response.status === 201) {
            return response.json();
        } else if (response.status === 401) {
            videresendTilInnlogging();
        } else if (response.status === 403) {
            throw new Error('Du har ikke tilgang til siden. (status kode: 403)');
        }

        let error;
        try {
            error = await response.json();
        } catch (e) {
            throw new SearchApiError({
                status: response.status,
                message: response.statusText,
            });
        }
        throw new SearchApiError({
            message: error.message,
            status: error.status,
        });
    } catch (e: any) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
}

export async function deleteJsonMedType<T>(
    url: string,
    bodyString?: string
): Promise<Nettressurs<T>> {
    try {
        const response: unknown = await deleteReq(url, bodyString);
        return suksess(response as T);
    } catch (e) {
        if (e instanceof SearchApiError) {
            return feil(e);
        } else {
            throw e;
        }
    }
}

const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export const postHeaders = () => ({
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    ...createCallIdHeader(),
});

export async function postJson(
    url: string,
    bodyString: string,
    parseAsJsonIgnoringContentType = false
) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: bodyString,
            headers: postHeaders(),
            mode: 'cors',
        });
        if (response.status === 200 || response.status === 201) {
            const contentType = response.headers.get('content-type');
            const parseAsJson =
                parseAsJsonIgnoringContentType || contentType?.includes('application/json');

            return parseAsJson ? response.json() : response.text();
        } else if (response.status === 204) {
            return undefined;
        }

        const feilmeldingFraBody = await response.text();
        throw new SearchApiError({
            status: response.status,
            message: feilmeldingFraBody,
        });
    } catch (e: any) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
}

export async function putJson(url: string | URL, bodyString?: string) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'PUT',
            body: bodyString,
            headers: postHeaders(),
            mode: 'cors',
        });
        if (response.status === 200 || response.status === 201) {
            return response.json();
        } else if (response.status === 204) {
            return undefined;
        }
        throw new SearchApiError({
            status: response.status,
        });
    } catch (e: any) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
}

export async function deleteReq(url: string, bodyString?: string) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'DELETE',
            body: bodyString,
            headers: postHeaders(),
            mode: 'cors',
        });

        if (response.status <= 202) {
            return response.json();
        } else if (response.status === 204) {
            return null;
        }
        throw new SearchApiError({
            status: response.status,
        });
    } catch (e: any) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
}

export async function deleteWithoutJson(url: string, bodyString?: string) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'DELETE',
            body: bodyString,
            headers: postHeaders(),
            mode: 'cors',
        });

        if (!response.ok) {
            throw new SearchApiError({
                status: response.status,
            });
        }
    } catch (e: any) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
}
