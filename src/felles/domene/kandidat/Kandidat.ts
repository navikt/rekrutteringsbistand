import Cv, { Språkferdighetsnivå } from './Cv';
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
    kommuneNavn: string;
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

export type KandidatTilKandidatsøk = {
    fodselsnummer: Id['fodselsnummer'];
    aktorId: Id['aktorId'];
    fornavn: Personalia['fornavn'];
    etternavn: Personalia['etternavn'];
    arenaKandidatnr: Id['arenaKandidatnr'];
    kvalifiseringsgruppekode: Oppfølgingsinformasjon['kvalifiseringsgruppekode'];
    yrkeJobbonskerObj: Jobbprofil['yrkeJobbonskerObj'];
    geografiJobbonsker: Jobbprofil['geografiJobbonsker'];
};

/*
 * Dette formatet brukes av `hentcv`-endepunktet i kandidat-api, når man åpner
 * kandidatsiden i Rekrutteringsbistand. Merk at dette formatet ikke er helt likt
 * Kandidat-typen, fordi backend gjør noe behandling før ElasticSearch-responsen
 * returneres til frontend.
 */
export type KandidatCv = {
    // Felter kopiert 1:1
    aktorId: Id['aktorId'];
    beskrivelse: Cv['beskrivelse'];
    disponererBil: UtgåtteFelter['disponererBil'];
    etternavn: Personalia['etternavn'];
    fagdokumentasjon: Cv['fagdokumentasjon'];
    fodselsdato: Personalia['fodselsdato'];
    fodselsnummer: Id['fodselsnummer'];
    forerkort: Cv['forerkort'];
    fornavn: Personalia['fornavn'];
    geografiJobbonsker: Jobbprofil['geografiJobbonsker'];
    godkjenninger: Cv['godkjenninger'];
    mobiltelefon: string;
    oppstartKode: Jobbprofil['oppstartKode'];
    telefon: Personalia['telefon'];
    yrkeserfaring: Cv['yrkeserfaring'];

    // Felter med andre navn
    annenErfaring: Cv['annenerfaringObj'];
    ansettelsesformJobbprofil: Jobbprofil['ansettelsesformJobbonskerObj'];
    arbeidsdagerJobbprofil: Jobbprofil['arbeidsdagerJobbonskerObj'];
    arbeidstidJobbprofil: Jobbprofil['arbeidstidJobbonskerObj'];
    arbeidstidsordningJobbprofil: Jobbprofil['arbeidstidsordningJobbonskerObj'];
    epost: Personalia['epostadresse'];
    kandidatnummer: Id['arenaKandidatnr'];
    kompetanse: Cv['kompetanseObj'];
    kurs: Cv['kursObj'];
    omfangJobbprofil: Jobbprofil['omfangJobbonskerObj'];
    samtykkeDato: UbrukteFelter['samtykkeDato'];
    samtykkeStatus: UbrukteFelter['samtykkeStatus'];
    sertifikater: Cv['sertifikatObj'];
    sistEndret: UbrukteFelter['tidsstempel'];
    statsborgerskap: UtgåtteFelter['statsborgerskap'];
    utdanning: Cv['utdanning'];
    veilederIdent: string;
    verv: Cv['vervObj'];
    yrkeJobbonsker: Jobbprofil['yrkeJobbonskerObj'];

    // Felter som er mappet om
    adresse: {
        landkode: string;
        postnr: string;
        poststednavn: string;
        kommunenr: number;
        adrlinje1: string;
        adrlinje2: string;
        adrlinje3: string;
    };
    sprak: Array<{
        fraDato: null;
        kompetanseKode: null;
        kompetanseKodeTekst: string;
        alternativTekst: string;
        beskrivelse: string;
    }>;
    sprakferdigheter: Array<{
        sprak: string;
        ferdighetSkriftlig: Språkferdighetsnivå;
        ferdighetMuntlig: Språkferdighetsnivå;
    }>;

    // Felter som er lagt til
    veilederEpost: string;
    veilederNavn: string;
};

export default Kandidat;
