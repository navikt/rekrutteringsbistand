import Cv from './Cv';
import Jobbprofil from './Jobbprofil';
import Oppfølgingsinformasjon from './Oppfølgingsinformasjon';

type Id = {
    aktorId: string;
    fodselsnummer: string;
    arenaKandidatnr: string;
    kandidatnr: string;
};

type Personalia = {
    fornavn: string;
    etternavn: string;
    fodselsdato: string | null;
    epostadresse: string | null;
    telefon: string | null;
};

type Geografi = {
    kommunenummer: number;
    kommunenummerstring: string;
    postnummer: string | null;
    poststed: string | null;
    adresselinje1: string | null;
};

type Ubrukt = {
    totalLengdeYrkeserfaring: number;
    samtykkeStatus: string;
    samtykkeDato: string;
    harKontaktinformasjon: boolean;
    tidsstempel: string;
    adresselinje2: string;
    adresselinje3: string;
    doed: boolean;
    frKode: string;
    fylkeNavn: string;
    kommuneNavn: string;
    kommunenummerkw: number;
    fodselsdatoErDnr: boolean;
    synligForArbeidsgiverSok: boolean;
    synligForVeilederSok: boolean;
};

type Deprecated = {
    mobiltelefon: null;
    statsborgerskap: null;
    disponererBil: null;
    landkode: null;
    fritattAgKandidatsok: null;
    fritattKandidatsok: null;
};

type KandidatISøk = Id &
    Personalia &
    Geografi &
    Oppfølgingsinformasjon &
    Jobbprofil &
    Cv &
    Ubrukt &
    Deprecated;

export type KandidatLookup = {
    fornavn: Personalia['fornavn'];
    etternavn: Personalia['etternavn'];
    arenaKandidatnr: Id['arenaKandidatnr'];
};

export type KandidatTilStillingssøk = {
    fornavn: Personalia['fornavn'];
    etternavn: Personalia['etternavn'];
    arenaKandidatnr: Id['arenaKandidatnr'];
    fodselsdato: Personalia['fodselsdato'];
    adresselinje1: Geografi['adresselinje1'];
    postnummer: Geografi['postnummer'];
    poststed: Geografi['poststed'];
    epostadresse: Personalia['epostadresse'];
    telefon: Personalia['telefon'];
    veileder: Oppfølgingsinformasjon['veileder'];
    geografiJobbonsker: Jobbprofil['geografiJobbonsker'];
    yrkeJobbonskerObj: Jobbprofil['yrkeJobbonskerObj'];
};

export default KandidatISøk;
