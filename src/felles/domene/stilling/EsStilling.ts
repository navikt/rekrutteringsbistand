import { isAfter, startOfDay } from 'date-fns';
import {
    AdminStatus,
    Ansettelsesform,
    Arbeidstidsordning,
    Geografi,
    Kontaktinfo,
    Omfang,
    Status,
    Stillingbase,
    Stillingsinfo,
    StyrkCategory,
    Søknadsfrist,
} from './Stilling';

export type EsRekrutteringsbistandstilling = {
    stilling: EsStilling;
    stillingsinfo: Stillingsinfo | null;
};

/* Datastrukturen som brukes i ElasticSearch/OpenSearch */
export type EsStilling = Stillingbase & {
    annonsenr: string | null;
    categories: StyrkCategory[];
    locations: Geografi[];
    contacts: Kontaktinfo[];
    employer: EsArbeidsgiver | null;
    properties: EsProperties;
};

export type EsProperties = Partial<{
    adtext: string;
    author: string;
    employer: string;
    jobtitle: string;
    location: string;
    starttime: string;
    extent: Omfang;
    engagementtype: Ansettelsesform;
    positioncount: number;
    tags: string[];
    workday: string[];
    workhours: string[];
    sourceurl: string;
    applicationurl: string;
    applicationemail: string;
    applicationdue: Søknadsfrist | string;
    jobarrangement: Arbeidstidsordning;
    sector: string;
}>;

export type EsArbeidsgiver = {
    name: string;
    publicName: string;
    orgnr: string | null;
    parentOrgnr: string | null;
    orgform: string;
};

const utløperFørIdag = (expires: string | null) => {
    if (expires === null) {
        return false;
    }

    const startenAvDøgnet = startOfDay(new Date());
    return new Date(expires) <= startenAvDøgnet;
};

export const stillingErUtløpt = (stilling: EsStilling): boolean => {
    return (
        stilling.publishedByAdmin !== null &&
        stilling.status === Status.Inaktiv &&
        utløperFørIdag(stilling.expires) &&
        stilling.administration?.status === AdminStatus.Done
    );
};

export const stillingKommerTilÅBliAktiv = (stilling: EsStilling): boolean => {
    if (stilling.published === null || stilling.expires === null) return false;

    return (
        stilling.publishedByAdmin !== null &&
        stilling.administration?.status === AdminStatus.Done &&
        stilling.status === Status.Inaktiv &&
        isAfter(new Date(stilling.published), new Date()) &&
        isAfter(new Date(stilling.expires), new Date(stilling.published))
    );
};
