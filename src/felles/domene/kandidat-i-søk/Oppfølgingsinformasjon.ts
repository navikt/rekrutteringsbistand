export enum Innsatsgruppe {
    SpesieltTilpassetInnsats = 'BATT',
    SituasjonsbestemtInnsats = 'BFORM',
    Standardinnsats = 'IKVAL',
    VarigTilpasset = 'VARIG',
}

export enum Servicegruppe {
    IkkeVurdert = 'IVURD',
    BehovForArbeidsevnevurdering = 'BKART',
    HelserelatertArbeidsrettetOppfølgingINav = 'OPPFI',
    SykmeldtMedOppfølgingPåArbeidsplassen = 'VURDI',
    SykmeldtUtenArbeidsgiver = 'VURDU',
}

export type Kvalifiseringsgruppe = Innsatsgruppe | Servicegruppe;

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
    kvalifiseringsgruppekode: Kvalifiseringsgruppe;
    formidlingsgruppekode: Formidlingsgruppe;
    veileder: string | null;
};

export default Oppfølgingsinformasjon;
