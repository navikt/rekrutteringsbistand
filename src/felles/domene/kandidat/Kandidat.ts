import Cv from './Cv';
import Jobbprofil from './Jobbprofil';
import Oppfølgingsinformasjon from './Oppfølgingsinformasjon';

export type Id = {
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
    kommuneNavn: string;
};

type UbrukteFelter = {
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
    kommunenummerkw: number;
    fodselsdatoErDnr: boolean;
    synligForArbeidsgiverSok: boolean;
    synligForVeilederSok: boolean;
};

type UtgåtteFelter = {
    mobiltelefon: null;
    statsborgerskap: null;
    disponererBil: null;
    landkode: null;
    fritattAgKandidatsok: null;
    fritattKandidatsok: null;
};

/* Fullverdig kandidattype slik det er definert i ElasticSearch. */
type Kandidat = Id &
    Personalia &
    Geografi &
    Oppfølgingsinformasjon &
    Jobbprofil &
    Cv &
    UbrukteFelter &
    UtgåtteFelter;

/* Brukes når man søker opp en spesifikk person i ElasticSearch. */
export type KandidatLookup = {
    fornavn: Personalia['fornavn'];
    etternavn: Personalia['etternavn'];
    arenaKandidatnr: Id['arenaKandidatnr'];
};

export type KandidatTilKandidatsøk = {
    fodselsnummer: Id['fodselsnummer'];
    aktorId: Id['aktorId'];
    fornavn: Personalia['fornavn'];
    etternavn: Personalia['etternavn'];
    arenaKandidatnr: Id['arenaKandidatnr'];
    kvalifiseringsgruppekode: Oppfølgingsinformasjon['kvalifiseringsgruppekode'];
    yrkeJobbonskerObj: Jobbprofil['yrkeJobbonskerObj'];
    geografiJobbonsker: Jobbprofil['geografiJobbonsker'];
    kommuneNavn: Geografi['kommuneNavn'];
    postnummer: Geografi['postnummer'];
};

export default Kandidat;
