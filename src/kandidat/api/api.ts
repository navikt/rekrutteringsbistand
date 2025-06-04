import { api, post } from 'felles/api';
import { Kandidatstatus, Kandidatutfall } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FormidlingAvUsynligKandidatOutboundDto } from '../../api/server.dto';
import { MineKandidatlister } from '../kandidatside/fraSøkUtenKontekst/lagre-kandidat-modal/useMineKandidatlister';
import { fetchJson, postJson, putJson } from './fetchUtils';

export const ENHETSREGISTER_API = `/${api.stilling}/search-api`;

const convertToUrlParams = (query: any) =>
    Object.keys(query)
        .map((key) => {
            if (Array.isArray(query[key])) {
                const encodedKey = encodeURIComponent(key);
                return query[key]
                    .map((v: any) => `${encodedKey}=${encodeURIComponent(v)}`)
                    .reduce(
                        (accumulator: unknown, current: unknown) => `${accumulator}&${current}`,
                        ''
                    );
            } else {
                if (query[key]) {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
                }
            }

            return '';
        })
        .join('&')
        .replace(/%20/g, '+');

const employerNameCompletionQueryTemplate = (match: unknown) => ({
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

export const fetchKandidatlisteMedStillingsId = (stillingsId: string) => {
    if (stillingsId === undefined) throw new Error('stillingId is undefined');
    return fetchJson(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste`, true);
};

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

export function putKandidatliste(stillingsId: string) {
    return putJson(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste/`);
}

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
    } catch (e: any) {
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

export const putArkivert = (
    kandidatlisteId: string,
    kandidatNr: string,
    arkivert: boolean,
    navKontor: string
) => {
    return putJson(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatNr}/arkivert`,
        JSON.stringify({ arkivert, navKontor })
    );
};

export const putArkivertForFlereKandidater = (
    kandidatlisteId: string,
    kandidatnumre: string[],
    arkivert: boolean,
    navKontor: string
): Promise<Array<string | null>> => {
    return Promise.all(
        kandidatnumre.map((kandidatNr) =>
            putArkivert(kandidatlisteId, kandidatNr, arkivert, navKontor)
                .then((kandidat) => kandidat.kandidatnr)
                .catch(() => null)
        )
    );
};

export const fetchMineKandidatlister = async (
    side: number,
    pageSize: number
): Promise<MineKandidatlister> =>
    await fetchJson(
        `${api.kandidat}/veileder/kandidatlister?pagesize=${pageSize}${
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

export const fetchArbeidsgivereEnhetsregister = (query: unknown) =>
    postJson(
        `${ENHETSREGISTER_API}/underenhet/_search`,
        JSON.stringify(employerNameCompletionQueryTemplate(query)),
        true
    );

export const fetchArbeidsgivereEnhetsregisterOrgnr = (orgnr: string) => {
    const query = orgnr.replace(/\s/g, '');
    return fetchJson(`${ENHETSREGISTER_API}/underenhet/_search?q=organisasjonsnummer:${query}*`);
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
