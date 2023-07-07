import { api } from 'felles/api';
import { ApiError } from '../../api/apiUtils';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { KandidatLookup } from 'felles/domene/kandidat-i-søk/KandidatISøk';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

export const fetchSynlighetsevaluering = async (
    fødselsnummer: string
): Promise<Nettressurs<Synlighetsevaluering>> => {
    const url = `${api.synlighet}/evaluering/${fødselsnummer}`;

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
        return {
            kind: Nettstatus.Feil,
            error: {
                message: 'Nettverksfeil',
            },
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

export const fetchKandidatMedFnr = async (fnr: string): Promise<Nettressurs<KandidatLookup>> => {
    const url = `${api.kandidat}/veileder/kandidatsok/fnrsok`;
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

export const fetchKandidatliste = (stillingsId: string): Promise<Kandidatliste> =>
    fetchJson(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste`);

const postHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        Accept: 'application/json',
    };
};

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

const throwError = (message?: string, status?: number) => {
    throw new KandidatSokError({ message, status });
};

const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};
