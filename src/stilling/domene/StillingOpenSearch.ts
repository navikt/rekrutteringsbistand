import { isAfter, startOfDay } from 'date-fns';

import {
    Administration,
    AdminStatus,
    Geografi,
    Kilde,
    Kontaktinfo,
    Privacy,
    Properties,
    Status,
    Stillingsinfo,
    StyrkCategory,
} from '../domene/Stilling';

export type RekrutteringsbistandstillingOpenSearch = {
    stilling: StillingOpenSearch;
    stillingsinfo: Stillingsinfo | null;
};

export type StillingOpenSearch = {
    title: string;
    uuid: string;
    annonsenr: string | null;
    status: Status;
    privacy: Privacy | string;
    published: string | null;
    publishedByAdmin: string | null;
    expires: string | null;
    created: string;
    updated: string;
    employer: ArbeidsgiverOpenSearch | null;
    categories: StyrkCategory[];
    source: Kilde | string;
    medium: string;
    businessName: string | null;
    locations: Geografi[];
    contacts: Kontaktinfo[];
    reference: string;
    administration: Administration | null;
    properties: Properties & Record<string, any>;
};

export type ArbeidsgiverOpenSearch = {
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

export const stillingErUtløpt = (stilling: StillingOpenSearch): boolean => {
    return (
        stilling.publishedByAdmin !== null &&
        stilling.status === Status.Inaktiv &&
        utløperFørIdag(stilling.expires) &&
        stilling.administration?.status === AdminStatus.Done
    );
};

export const stillingKommerTilÅBliAktiv = (stilling: StillingOpenSearch): boolean => {
    if (stilling.published === null || stilling.expires === null) return false;

    return (
        stilling.publishedByAdmin !== null &&
        stilling.administration?.status === AdminStatus.Done &&
        stilling.status === Status.Inaktiv &&
        isAfter(new Date(stilling.published), new Date()) &&
        isAfter(new Date(stilling.expires), new Date(stilling.published))
    );
};
