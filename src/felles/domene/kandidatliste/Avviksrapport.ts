export type Avviksrapport = {
    tidspunkt: string;
};

export type AvviksrapportOutboundDto = {
    bruktTilFeilFormål: boolean;
    avvikIFritekstfelt: boolean;
    listeOverAvvikIFritekstfelt: AvvikIFritekstfelt[];
    forNavkontor: String;
};

export enum AvvikIFritekstfelt {
    Etnisitet = 'ETNISITET',
    Religion = 'RELIGION',
    SeksuellLegning = 'SEKSUELL_LEGNING',
    Helseopplysninger = 'HELSEOPPLYSNINGER',
    Straffehistorikk = 'STRAFFEHISTORIKK',
    SosialeEllerØkonomiskeForhold = 'SOSIALE_ELLER_ØKONOMISKE_FORHOLD',
    PersonopplysningerOmTredjepersoner = 'PERSONOPPLYSNINGER_OM_TREDJEPERSONER',
    SubjektiveNegativeRefleksjoner = 'SUBJEKTIVE_NEGATIVE_REFLEKSJONER',
}

const mapFraAvvikIFritekstfeltTilVisningsnavn: Record<AvvikIFritekstfelt, string> = {
    [AvvikIFritekstfelt.Etnisitet]: 'Etnisitet (f.eks. nasjonalitet, opprinnelse)',
    [AvvikIFritekstfelt.Religion]: 'Religion',
    [AvvikIFritekstfelt.SeksuellLegning]: 'Seksuell legning',
    [AvvikIFritekstfelt.Helseopplysninger]: 'Helseopplysninger',
    [AvvikIFritekstfelt.Straffehistorikk]: 'Straffehistorikk (f.eks. fengselsopphold)',
    [AvvikIFritekstfelt.SosialeEllerØkonomiskeForhold]:
        'Sosiale eller økonomiske forhold (f.eks. gjeld)',
    [AvvikIFritekstfelt.PersonopplysningerOmTredjepersoner]: 'Personopplysninger om tredjepersoner',
    [AvvikIFritekstfelt.SubjektiveNegativeRefleksjoner]: 'Subjektive negative refleksjoner ',
};

export const avvikIFritekstfeltTilVisningsnavn = (avvikIFritekstfelt: AvvikIFritekstfelt): string =>
    mapFraAvvikIFritekstfeltTilVisningsnavn[avvikIFritekstfelt] ?? avvikIFritekstfelt;

export const avvikMedVisningsnavnTilEnum = (
    visningsnavn: string
): AvvikIFritekstfelt | undefined => {
    const [somEnum] = Object.entries(mapFraAvvikIFritekstfeltTilVisningsnavn).find(
        ([_, avvikSittVisningsnavn]) => {
            return avvikSittVisningsnavn === visningsnavn;
        }
    );

    return somEnum as AvvikIFritekstfelt;
};
