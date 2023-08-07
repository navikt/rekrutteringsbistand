import Cv, { Språkferdighet } from './Cv';
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

export type EsKandidat = {
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
    fodselsnummer: Id['fodselsnummer'];
    aktorId: Id['aktorId'];
    kvalifiseringsgruppekode: Oppfølgingsinformasjon['kvalifiseringsgruppekode'];
};

/*
 * Dette formatet brukes av `hentcv`-endepunktet i kandidat-api, når man åpner
 * kandidatsiden i Rekrutteringsbistand. Merk at dette formatet ikke er helt likt
 * Kandidat-typen, fordi backend gjør noe behandling før ElasticSearch-responsen
 * returneres til frontend.
 */
export type KandidatCv = {
    adresse: {
        landkode: string;
        postnr: string;
        poststednavn: string;
        kommunenr: number;
        adrlinje1: string;
        adrlinje2: string;
        adrlinje3: string;
    };
    beskrivelse: Cv['beskrivelse'];
    sprak: Cv['sprak'];
    sprakferdigheter: Språkferdighet[];
    yrkeserfaring: Cv['yrkeserfaring'];
    utdanning: Cv['utdanning'];
    forerkort: Cv['forerkort'];
    fagdokumentasjon: Cv['fagdokumentasjon'];
    godkjenninger: Cv['godkjenninger'];
    aktorId: Id['aktorId'];
    annenErfaring: Cv['annenerfaringObj'];
    ansettelsesformJobbprofil: Jobbprofil['ansettelsesformJobbonskerObj'];
    arbeidsdagerJobbprofil: Jobbprofil['arbeidsdagerJobbonskerObj'];
    arbeidstidJobbprofil: Jobbprofil['arbeidstidJobbonskerObj'];
    arbeidstidsordningJobbprofil: Jobbprofil['arbeidstidsordningJobbonskerObj'];
    disponererBil: UtgåtteFelter['disponererBil'];
    epost: Personalia['epostadresse'];
    etternavn: Personalia['etternavn'];
    fodselsdato: Personalia['fodselsdato'];
    fodselsnummer: Id['fodselsnummer'];
    fornavn: Personalia['fornavn'];
    geografiJobbonsker: Jobbprofil['geografiJobbonsker'];
    kandidatnummer: Id['arenaKandidatnr'];
    kompetanse: Cv['kompetanseObj'];
    kurs: Cv['kursObj'];
    mobiltelefon: UtgåtteFelter['mobiltelefon'];
    omfangJobbprofil: Jobbprofil['omfangJobbonskerObj'];
    oppstartKode: Jobbprofil['oppstartKode'];
    samtykkeDato: UbrukteFelter['samtykkeDato'];
    samtykkeStatus: UbrukteFelter['samtykkeStatus'];
    sertifikater: Cv['sertifikatObj'];
    statsborgerskap: UtgåtteFelter['statsborgerskap'];
    telefon: Personalia['telefon'];
    sistEndret: UbrukteFelter['tidsstempel'];
    veilederEpost: string;
    veilederIdent: string;
    veilederNavn: string;
    verv: Cv['vervObj'];
    yrkeJobbonsker: Jobbprofil['yrkeJobbonskerObj'];
};

export default Kandidat;
