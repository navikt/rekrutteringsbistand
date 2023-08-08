import { FormidlingAvUsynligKandidat, KandidatIKandidatliste } from './KandidatIKandidatliste';

type Kandidatliste = {
    kandidatlisteId: string;
    tittel: string;
    beskrivelse: string | null;
    organisasjonReferanse: string | null;
    organisasjonNavn: string | null;
    stillingId: string | null;
    opprettetAv: OpprettetAv;
    opprettetTidspunkt: string;
    kanEditere: boolean;
    kanSlette: KanSletteKandidatliste;
    kandidater: KandidatIKandidatliste[];
    formidlingerAvUsynligKandidat: FormidlingAvUsynligKandidat[];
    status: Kandidatlistestatus;
    antallStillinger: number | null;
    stillingskategori: Stillingskategori | null;
};

export enum KanSletteKandidatliste {
    KanSlettes = 'KAN_SLETTES',
    ErIkkeDin = 'ER_IKKE_DIN',
    HarStilling = 'HAR_STILLING',
    ErIkkeDinOgHarStilling = 'ER_IKKE_DIN_OG_HAR_STILLING',
}

export type KandidatlisteSammendrag = Omit<
    Kandidatliste,
    'kandidater' | 'formidlingerAvUsynligKandidat'
> & {
    antallKandidater: number;
    antallUsynligeKandidater: number;
};

export enum Kandidatlistestatus {
    Åpen = 'ÅPEN',
    Lukket = 'LUKKET',
}

export enum Stillingskategori {
    Stilling = 'STILLING',
    Formidling = 'FORMIDLING',
    Arbeidstrening = 'ARBEIDSTRENING',
    Jobbmesse = 'JOBBMESSE',
}

export type OpprettetAv = {
    ident: string;
    navn: string;
};

export default Kandidatliste;
