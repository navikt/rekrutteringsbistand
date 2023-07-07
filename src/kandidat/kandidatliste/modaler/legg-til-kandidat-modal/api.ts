import { api } from 'felles/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { SearchApiError, postHeaders } from '../../../api/fetchUtils';
import { ForenkletKandidatISøk } from 'felles/domene/kandidat-i-søk/KandidatISøk';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';

export const fetchKandidatMedFnr = async (
    fnr: string
): Promise<Nettressurs<ForenkletKandidatISøk>> => {
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
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
};

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
            throw await response.text();
        }
    } catch (e) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
};
