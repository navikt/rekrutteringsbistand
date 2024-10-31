import { api } from 'felles/api';
import { Enhetsregistertreff } from 'felles/domene/stilling/Enhetsregister';
import Stilling, {
    AdminStatus,
    Rekrutteringsbistandstilling,
    Stillingsinfo,
    Stillingskategori,
} from 'felles/domene/stilling/Stilling';
import { Miljø, getMiljø } from 'felles/miljø';
import { fetchGet, fetchPost, fetchPut } from './apiUtils';
import devVirksomheter from './devVirksomheter';
import { v4 as uuidv4 } from 'uuid';

export const postStilling = async (
    stilling: Partial<Stilling>,
    kategori: Stillingskategori
): Promise<Rekrutteringsbistandstilling> => {
    const postUrl = `${api.stilling}/rekrutteringsbistandstilling`;

    return await fetchPost(postUrl, {
        stilling,
        kategori,
    });
};

export const hentRekrutteringsbistandstilling = async (
    uuid: string
): Promise<Rekrutteringsbistandstilling> => {
    const rekrutteringsbistandstilling: Rekrutteringsbistandstilling = await fetchGet(
        `${api.stilling}/rekrutteringsbistandstilling/${uuid}`
    );

    if (rekrutteringsbistandstilling.stilling.administration === null) {
        return {
            ...rekrutteringsbistandstilling,
            stilling: fixMissingAdministration(rekrutteringsbistandstilling.stilling),
        };
    }

    return rekrutteringsbistandstilling;
};

export const kopierStilling = async (
    stillingsId: string
): Promise<Rekrutteringsbistandstilling> => {
    return await fetchPost(`${api.stilling}/rekrutteringsbistandstilling/kopier/${stillingsId}`);
};

export type OpprettKandidatlisteForEksternStillingDto = {
    stillingsid: string;
    eierNavident: string;
    eierNavn: string;
};

export const opprettKandidatlisteForEksternStilling = async (
    dto: OpprettKandidatlisteForEksternStillingDto
): Promise<Stillingsinfo> => await fetchPut(`${api.stilling}/stillingsinfo`, dto);

const employerNameCompletionQueryTemplate = (match: string) => ({
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

export const fetchEmployerNameCompletionHits = async (
    input: string
): Promise<Enhetsregistertreff[]> => {
    if (getMiljø() === Miljø.DevGcp) {
        const matchendeVirksomheter = devVirksomheter.filter((virksomhet: Enhetsregistertreff) =>
            virksomhet.name.toLowerCase().includes(input.toLowerCase())
        );

        return Promise.resolve(matchendeVirksomheter);
    }

    const result = await fetchPost(
        `${api.stilling}/search-api/underenhet/_search`,
        employerNameCompletionQueryTemplate(input)
    );

    return [
        ...result.hits.hits.map((employer: any) => ({
            name: employer._source.navn,
            orgnr: employer._source.organisasjonsnummer,
            location: employer._source.adresse
                ? {
                      address: employer._source.adresse.adresse,
                      postalCode: employer._source.adresse.postnummer,
                      city: employer._source.adresse.poststed,
                  }
                : undefined,
        })),
    ];
};

export const fetchOrgnrSuggestions = async (orgnummer: string): Promise<Enhetsregistertreff[]> => {
    const utenMellomrom = orgnummer.replace(/\s/g, '');

    if (getMiljø() === Miljø.DevGcp) {
        const matchendeVirksomheter = devVirksomheter.filter((virksomhet: Enhetsregistertreff) =>
            virksomhet.orgnr?.includes(orgnummer)
        );
        return Promise.resolve(matchendeVirksomheter);
    }

    const result = await fetchGet(
        `${api.stilling}/search-api/underenhet/_search?q=organisasjonsnummer:${utenMellomrom}*`
    );

    return [
        ...result.hits.hits
            .map((employer: any) => ({
                name: employer._source.navn,
                orgnr: employer._source.organisasjonsnummer,
                location: employer._source.adresse
                    ? {
                          address: employer._source.adresse.adresse,
                          postalCode: employer._source.adresse.postnummer,
                          city: employer._source.adresse.poststed,
                      }
                    : undefined,
            }))
            .sort(),
    ];
};

/**
 * TODO: Dette er en workaround, fordi det finnes annonser med ad.administration=null i databasen.
 * Når databasen er migrert og ikke inneholder administration=null kan denne workarounden fjernes.
 */
const fixMissingAdministration = (ad: Stilling): Stilling => ({
    ...ad,
    administration: {
        comments: '',
        status: AdminStatus.Received,
        reportee: '',
        navIdent: '',
        remarks: [],
    },
});
