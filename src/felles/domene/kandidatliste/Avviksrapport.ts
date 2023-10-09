export type Avviksrapport = {
    tidspunkt: string;
};

export type AvviksrapportOutboundDto = {
    bruktTilFeilFormål: boolean;
    avvikIFritekstfelt: boolean;
    listeOverAvvikIFritekstfelt: AvvikIFritekstfelt[];
    forNavkontor: String;
};

enum AvvikIFritekstfelt {
    Etnisitet = 'ETNISITET',
    Religion = 'RELIGION',
    SeksuellLegning = 'SEKSUELL_LEGNING',
    Helseopplysninger = 'HELSEOPPLYSNINGER',
    Straffehistorikk = 'STRAFFEHISTORIKK',
    SosialeEllerØkonomiskeForhold = 'SOSIALE_ELLER_ØKONOMISKE_FORHOLD',
    PersonopplysningerOmTredjepersoner = 'PERSONOPPLYSNINGER_OM_TREDJEPERSONER',
    SubjektiveNegativeRefleksjoner = 'SUBJEKTIVE_NEGATIVE_REFLEKSJONER',
}

export const avvikIFritekstfeltTilVisningsnavn = (
    avvikIFritekstfelt: AvvikIFritekstfelt
): string => {
    switch (avvikIFritekstfelt) {
        case AvvikIFritekstfelt.Etnisitet:
            return 'Etnisitet (f.eks. nasjonalitet, opprinnelse)';
        case AvvikIFritekstfelt.Religion:
            return 'Religion';
        case AvvikIFritekstfelt.SeksuellLegning:
            return 'Seksuell legning';
        case AvvikIFritekstfelt.Helseopplysninger:
            return 'Helseopplysninger';
        case AvvikIFritekstfelt.Straffehistorikk:
            return 'Straffehistorikk (f.eks. fengselsopphold)';
        case AvvikIFritekstfelt.SosialeEllerØkonomiskeForhold:
            return 'Sosiale eller økonomiske forhold (f.eks. gjeld)';
        case AvvikIFritekstfelt.PersonopplysningerOmTredjepersoner:
            return 'Personopplysninger om tredjepersoner';
        case AvvikIFritekstfelt.SubjektiveNegativeRefleksjoner:
            return 'Subjektive negative refleksjoner ';
        default:
            return avvikIFritekstfelt;
    }
};
