import { api, videresendTilInnlogging } from 'felles/api';
import { EsQuery, EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import StandardsøkDto from '../filter/standardsøk/Standardsøk';

export const søk = async (
    query: EsQuery<EsRekrutteringsbistandstilling>,
    forklarScore = false
): Promise<EsResponse<EsRekrutteringsbistandstilling>> => {
    const url = `${api.stillingssøk}/stilling/_search`;
    const urlMedParams = forklarScore ? `${url}?explain=true` : url;
    const respons = await post(urlMedParams, query);

    if (respons.status === 401) {
        videresendTilInnlogging();
    } else if (respons.status === 403) {
        throw Error('Er ikke logget inn');
    } else if (respons.status !== 200) {
        throw Error(`Klarte ikke å gjøre et søk. ${logErrorResponse(respons)}`);
    }

    return respons.json();
};

export const hentStandardsøk = async (): Promise<StandardsøkDto> => {
    const respons = await fetch(`${api.stilling}/standardsok`, {
        method: 'GET',
    });

    if (respons.status === 401) {
        videresendTilInnlogging();
    } else if (respons.ok) {
        return await respons.json();
    }

    throw Error(`Klarte ikke å hente standardsøk. ${logErrorResponse(respons)}`);
};

export const oppdaterStandardsøk = async (
    standardsøk: URLSearchParams
): Promise<StandardsøkDto> => {
    const respons = await put(`${api.stilling}/standardsok`, {
        søk: standardsøk.toString(),
    });

    if (respons.status === 401) {
        videresendTilInnlogging();
    } else if (respons.ok) {
        return await respons.json();
    }

    throw Error(`Klarte ikke å oppdatere standardsøk. ${logErrorResponse(respons)}`);
};

const logErrorResponse = (respons: Response) => {
    return `Statuskode: ${respons.status}, Statustekst: ${respons.statusText}, URL: ${respons.url}`;
};

export const post = (url: string, body: object) => jsonRequest(url, body, 'POST');
const put = (url: string, body: object) => jsonRequest(url, body, 'PUT');

const jsonRequest = (url: string, body?: object, method = 'GET') =>
    fetch(url, {
        body: JSON.stringify(body),
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
