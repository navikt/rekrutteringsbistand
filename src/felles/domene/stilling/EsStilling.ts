import { startOfDay } from 'date-fns';
import {
    AdminStatus,
    EsStyrkCategory,
    Geografi,
    Kontaktinfo,
    Properties,
    Status,
    Stillingbase,
    Stillingsinfo,
} from './Stilling';

export type EsRekrutteringsbistandstilling = {
    stilling: EsStilling;
    stillingsinfo: Stillingsinfo | null;
};

/* Datastrukturen som brukes i ElasticSearch/OpenSearch */
export type EsStilling = Stillingbase & {
    annonsenr: string | null;
    categories: EsStyrkCategory[];
    locations: Geografi[];
    contacts: Kontaktinfo[];
    employer: EsArbeidsgiver | null;
    properties: EsProperties;
    styrkEllerTittel: string;
};

export type EsProperties = Partial<{
    adtext: Properties['adtext'];
    author: Properties['author'];
    employer: Properties['employer'];
    jobtitle: Properties['jobtitle'];
    location: Properties['location'];
    starttime: Properties['starttime'];
    extent: Properties['extent'];
    engagementtype: Properties['engagementtype'];
    applicationurl: Properties['applicationurl'];
    applicationemail: Properties['applicationemail'];
    applicationdue: Properties['applicationdue'];
    jobarrangement: Properties['jobarrangement'];
    sector: Properties['sector'];
    sourceurl: Properties['sourceurl'];

    positioncount: number;
    tags: string[];
    workday: string[];
    workhours: string[];
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
