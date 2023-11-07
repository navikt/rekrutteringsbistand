import { Stillingskategori } from '../stilling/Stilling';
import {
    FormidlingAvUsynligKandidat,
    KandidatIKandidatliste,
    Kandidatstatus,
    Kandidatutfall,
    Utfallsendring,
} from './KandidatIKandidatliste';

type Kandidatliste = {
    kandidatlisteId: string;
    tittel: string;
    beskrivelse: string | null;
    organisasjonReferanse: string | null;
    organisasjonNavn: string | null;
    stillingId: string | null;
    opprettetAv: OpprettetAv;
    opprettetTidspunkt: string;
    erEier: boolean;
    kanEditere: boolean;
    kanSlette: KanSletteKandidatliste;
    kandidater: KandidatIKandidatliste[];
    formidlingerAvUsynligKandidat: FormidlingAvUsynligKandidat[];
    status: Kandidatlistestatus;
    antallStillinger: number | null;
    stillingskategori: Stillingskategori | null;
};

/* Brukes i Historikk-fanen når vi henter alle kandidatlistene en kandidat ligger på */
export type KandidatlisteForKandidat = {
    kandidatnr: string;
    fornavn: string;
    etternavn: string;
    lagtTilTidspunkt: string;
    lagtTilAvIdent: string;
    lagtTilAvEpost: string;
    lagtTilAvNavn: string;
    status: Kandidatstatus;
    utfall: Kandidatutfall;
    uuid: string;
    tittel: string;
    organisasjonReferanse?: string;
    organisasjonNavn?: string;
    stillingId?: string;
    slettet?: boolean;
    antallStillinger?: number;
    utfallsendringer: Utfallsendring[];
    stillingskategori: Stillingskategori | null;
    opprettetAvIdent: string;
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

export type OpprettetAv = {
    ident: string;
    navn: string;
};

export default Kandidatliste;
