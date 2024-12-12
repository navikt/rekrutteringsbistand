export enum Innsatsgruppe {
    SpesieltTilpassetInnsats = 'SPESIELT_TILPASSET_INNSATS',
    SituasjonsbestemtInnsats = 'SITUASJONSBESTEMT_INNSATS',
    Standardinnsats = 'STANDARD_INNSATS',
    VarigTilpassetInnsats = 'VARIG_TILPASSET_INNSATS',
    GradertVarigTilpassetInnsats = 'GRADERT_VARIG_TILPASSET_INNSATS',
}

export type Kvalifiseringsgruppe = Innsatsgruppe;

export enum Formidlingsgruppe {
    Arbeidssøker = 'ARBS',
    IkkeArbeidssøker = 'IARBS',
}

export enum Hovedmål {
    ØkeDeltagelse = 'OKE_DELTAKELSE',
    SkaffeArbeid = 'SKAFFE_ARBEID',
    BeholdeArbeid = 'BEHOLDE_ARBEID',
}

type Oppfølgingsinformasjon = {
    navkontor: string;
    orgenhet: string;
    hovedmaalkode: Hovedmål;
    innsatsgruppekode: Kvalifiseringsgruppe;
    formidlingsgruppekode: Formidlingsgruppe;
    veileder: string | null;
    veilederIdent: string | null;
    veilederVisningsnavn: string | null;
    veilederEpost: string | null;
};

export default Oppfølgingsinformasjon;
