export enum Innsatsgruppe {
    Standard = 'Standard',
    SpesieltTilpasset = 'Spesielt tilpasset innsats',
    Situasjonsbestemt = 'Situasjonsbestemt innsats',
}

export enum Formidlingsgruppe {
    Arbeidssøker = 'ARBS',
    IkkeArbeidssøker = 'IARBS',
}

export enum Hovedmål {
    ØkeDeltagelse = 'OKEDELT',
    SkaffeArbeid = 'SKAFFEA',
    BeholdeArbeid = 'BEHOLDEA',
}

type Oppfølgingsinformasjon = {
    navkontor: string;
    orgenhet: string;
    hovedmaalkode: Hovedmål;
    kvalifiseringsgruppekode: Innsatsgruppe;
    formidlingsgruppekode: Formidlingsgruppe;
    veileder: string | null;
};

export default Oppfølgingsinformasjon;
