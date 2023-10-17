export type Avviksrapport = {
    tidspunkt: string;
};

export type AvviksrapportOutboundDto = {
    kandidatlisteId: string;
    bruktTilFeilFormål: boolean;
    avvikIFritekstfelt: boolean;
    listeOverAvvikIFritekstfelt: AvvikIFritekstfelt[];
    forNavkontor: string;
};

export enum AvvikIFritekstfelt {
    Etnisitet = 'ETNISITET',
    Religion = 'RELIGION',
    SeksuellLegning = 'SEKSUELL_LEGNING',
    Helseopplysninger = 'HELSEOPPLYSNINGER',
    Straffehistorikk = 'STRAFFEHISTORIKK',
    SosialeEllerØkonomiskeForhold = 'SOSIALE_ELLER_ØKONOMISKE_FORHOLD',
    SubjektiveNegativeRefleksjoner = 'SUBJEKTIVE_NEGATIVE_REFLEKSJONER',
    PersonopplysningerOmTredjepersoner = 'PERSONOPPLYSNINGER_OM_TREDJEPERSONER',
}

const mapFraAvvikIFritekstfeltTilVisningsnavn: Record<AvvikIFritekstfelt, string> = {
    [AvvikIFritekstfelt.Etnisitet]: 'Etnisitet (f.eks. nasjonalitet, kulturell tilhørighet)',
    [AvvikIFritekstfelt.Religion]: 'Religion',
    [AvvikIFritekstfelt.SeksuellLegning]: 'Seksuell legning',
    [AvvikIFritekstfelt.Helseopplysninger]:
        'Helseopplysninger (f.eks. diagnose, sykdomshistorikk, funksjonsnedsettelse)',
    [AvvikIFritekstfelt.Straffehistorikk]:
        'Straffehistorikk (f.eks. soningshistorikk, domfellelse)',
    [AvvikIFritekstfelt.SosialeEllerØkonomiskeForhold]:
        'Sosiale og økonomiske forhold (f.eks. sosial tilpasningsdyktighet, offentlige ytelser)',
    [AvvikIFritekstfelt.SubjektiveNegativeRefleksjoner]:
        'Subjektive negative refleksjoner angående bruker',
    [AvvikIFritekstfelt.PersonopplysningerOmTredjepersoner]:
        'Sensitive personopplysninger om tredjepersoner (f.eks. barn, ektefelle)',
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
