import { api, post } from 'felles/api';
import { Kandidatstatus, Kandidatutfall } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FormidlingAvUsynligKandidatOutboundDto } from '../../api/server.dto';
import { MineKandidatlister } from '../kandidatside/fraSøkUtenKontekst/lagre-kandidat-modal/useMineKandidatlister';
import { deleteJsonMedType, fetchJson, postJson, putJson } from './fetchUtils';

export const ENHETSREGISTER_API = `/${api.stilling}/search-api`;

const convertToUrlParams = (query: object) =>
    Object.keys(query)
        .map((key) => {
            if (Array.isArray(query[key])) {
                const encodedKey = encodeURIComponent(key);
                return query[key]
                    .map((v) => `${encodedKey}=${encodeURIComponent(v)}`)
                    .reduce((accumulator, current) => `${accumulator}&${current}`, '');
            } else {
                if (query[key]) {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
                }
            }

            return '';
        })
        .join('&')
        .replace(/%20/g, '+');

const employerNameCompletionQueryTemplate = (match) => ({
    query: {
        match_phrase: {
            navn_ngram_completion: {
                query: match,
                slop: 5,
            },
        },
    },
    size: 50,
});

export const fetchKandidatlisteMedStillingsId = (stillingsId: string) =>
    fetchJson(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste`, true);

export const fetchKandidatlisteMedKandidatlisteId = (kandidatlisteId: string) =>
    fetchJson(`${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}`, true);

export const putStatusKandidat = (
    status: Kandidatstatus,
    kandidatlisteId: string,
    kandidatnr: string
): Promise<Kandidatliste> =>
    putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/status`,
        JSON.stringify({ status })
    );

export const putUtfallKandidat = (
    utfall: Kandidatutfall,
    navKontor: string,
    kandidatlisteId: string,
    kandidatnr: string
): Promise<Kandidatliste> =>
    putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/utfall`,
        JSON.stringify({ utfall, navKontor })
    );

export const postKandidatliste = (kandidatlisteDto: any) =>
    postJson(`${api.kandidat}/veileder/me/kandidatlister`, JSON.stringify(kandidatlisteDto));

export function putKandidatliste(stillingsId) {
    return putJson(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste/`);
}

export function endreKandidatliste(kandidatlisteId: string, kandidatlisteDto: any) {
    return putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}`,
        JSON.stringify(kandidatlisteDto)
    );
}

export function fetchGeografiKode(geografiKode) {
    return fetchJson(`${api.kandidat}/kodeverk/arenageografikoder/${geografiKode}`, true);
}

export const fetchStillingFraListe = (stillingsId) =>
    fetchJson(`${api.kandidat}/kandidatsok/stilling/sokeord/${stillingsId}`, true);

export const postDelteKandidater = (
    beskjed: string,
    mailadresser: string[],
    kandidatlisteId: string,
    kandidatnummerListe: string[],
    navKontor: string
) =>
    post<Kandidatliste>(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/deltekandidater`,
        {
            epostMottakere: mailadresser,
            epostTekst: beskjed,
            kandidater: kandidatnummerListe,
            navKontor: navKontor,
        }
    );

export const postFormidlingerAvUsynligKandidat = async (
    kandidatlisteId: string,
    dto: FormidlingAvUsynligKandidatOutboundDto
): Promise<Nettressurs<Kandidatliste>> => {
    try {
        const body = await postJson(
            `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`,
            JSON.stringify(dto)
        );

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

export const putFormidlingsutfallForUsynligKandidat = (
    kandidatlisteId: string,
    formidlingId: string,
    utfall: Kandidatutfall,
    navKontor: string
): Promise<Kandidatliste> =>
    putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat/${formidlingId}/utfall`,
        JSON.stringify({ utfall, navKontor })
    );

export const putArkivert = (kandidatlisteId: string, kandidatNr: string, arkivert: boolean) => {
    return putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatNr}/arkivert`,
        JSON.stringify({ arkivert })
    );
};

export const putArkivertForFlereKandidater = (
    kandidatlisteId: string,
    kandidatnumre: string[],
    arkivert: boolean
): Promise<Array<string | null>> => {
    return Promise.all(
        kandidatnumre.map((kandidatNr) =>
            putArkivert(kandidatlisteId, kandidatNr, arkivert)
                .then((kandidat) => kandidat.kandidatnr)
                .catch(() => null)
        )
    );
};

export const fetchKandidatlister = (query = {}) =>
    fetchJson(`${api.kandidat}/veileder/kandidatlister?${convertToUrlParams(query)}`, true);

export const fetchMineKandidatlister = async (
    side: number,
    pageSize: number
): Promise<MineKandidatlister> =>
    await fetchJson(
        `${api.kandidat}/veileder/kandidatlister?kunEgne=true&status=ÅPEN&pagesize=${pageSize}${
            side > 1 ? `&pagenumber=${side - 1}` : ''
        }`
    );

export const fetchKandidatlisterForKandidat = (
    kandidatnr: string,
    inkluderSlettede?: boolean,
    filtrerPåStilling?: string
) => {
    return fetchJson(
        `${api.kandidat}/veileder/kandidater/${kandidatnr}/listeoversikt?${convertToUrlParams({
            inkluderSlettede: 'true',
            filtrerPaaStilling: filtrerPåStilling,
        })}`,
        true
    );
};

export const fetchArbeidsgivereEnhetsregister = (query) =>
    postJson(
        `${ENHETSREGISTER_API}/underenhet/_search`,
        JSON.stringify(employerNameCompletionQueryTemplate(query)),
        true
    );

export const fetchArbeidsgivereEnhetsregisterOrgnr = (orgnr) => {
    const query = orgnr.replace(/\s/g, '');
    return fetchJson(`${ENHETSREGISTER_API}/underenhet/_search?q=organisasjonsnummer:${query}*`);
};

export const markerKandidatlisteUtenStillingSomMin = (kandidatlisteId: string) =>
    putJson(`${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/eierskap`);

export async function deleteKandidatliste(kandidatlisteId: string): Promise<Nettressurs<any>> {
    return await deleteJsonMedType<any>(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}`
    );
}

export const fetchSendteMeldinger = (kandidatlisteId: string) =>
    fetchJson(`${api.sms}/${kandidatlisteId}`, true);

export const fetchSmserForKandidat = (fnr: string) => fetchJson(`${api.sms}/fnr/${fnr}`, true);

export const postSmsTilKandidater = (melding: string, fnr: string[], kandidatlisteId: string) =>
    postJson(
        `${api.sms}`,
        JSON.stringify({
            melding,
            fnr,
            kandidatlisteId,
        })
    );

export const fetchFerdigutfylteStillinger = () => {
    return fetchJson(`${api.kandidat}/veileder/ferdigutfyltesok`, true);
};

export const putKandidatlistestatus = (
    kandidatlisteId: string,
    status: Kandidatlistestatus
): Promise<Kandidatliste> => {
    return putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/status`,
        JSON.stringify({ status })
    );
};

export const slettCvFraArbeidsgiversKandidatliste = (
    kandidatlisteId: string,
    kandidatnummer: string,
    navKontor: string | null
): Promise<Kandidatliste> => {
    return putJson(
        `${api.kandidat}/veileder/kandidat/arbeidsgiverliste/${kandidatlisteId}/${kandidatnummer}`,
        JSON.stringify({ navKontor })
    );
};
