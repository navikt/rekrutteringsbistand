import { KandidatCv } from 'felles/domene/kandidat/EsKandidat';
import { mockKandidat } from '../kandidatsok-proxy/mockKandidat';

export const mockKandidatCv: KandidatCv = {
    // Felter kopiert 1:1
    aktorId: mockKandidat.aktorId,
    beskrivelse: mockKandidat.beskrivelse,
    disponererBil: mockKandidat.disponererBil,
    etternavn: mockKandidat.etternavn,
    fagdokumentasjon: mockKandidat.fagdokumentasjon,
    fodselsdato: mockKandidat.fodselsdato,
    fodselsnummer: mockKandidat.fodselsnummer,
    forerkort: mockKandidat.forerkort,
    fornavn: mockKandidat.fornavn,
    geografiJobbonsker: mockKandidat.geografiJobbonsker,
    godkjenninger: mockKandidat.godkjenninger,
    mobiltelefon: mockKandidat.mobiltelefon,
    oppstartKode: mockKandidat.oppstartKode,
    telefon: mockKandidat.telefon,
    yrkeserfaring: mockKandidat.yrkeserfaring,

    // Felter med andre navn
    annenErfaring: mockKandidat.annenerfaringObj,
    ansettelsesformJobbprofil: mockKandidat.ansettelsesformJobbonskerObj,
    arbeidsdagerJobbprofil: mockKandidat.arbeidsdagerJobbonskerObj,
    arbeidstidJobbprofil: mockKandidat.arbeidstidJobbonskerObj,
    arbeidstidsordningJobbprofil: mockKandidat.arbeidstidsordningJobbonskerObj,
    epost: mockKandidat.epostadresse,
    kandidatnummer: mockKandidat.kandidatnr,
    kompetanse: mockKandidat.kompetanseObj,
    kurs: mockKandidat.kursObj,
    omfangJobbprofil: mockKandidat.omfangJobbonskerObj,
    samtykkeDato: mockKandidat.samtykkeDato,
    samtykkeStatus: mockKandidat.samtykkeStatus,
    sertifikater: mockKandidat.sertifikatObj,
    sistEndret: mockKandidat.tidsstempel,
    statsborgerskap: mockKandidat.statsborgerskap,
    utdanning: mockKandidat.utdanning,
    veilederIdent: mockKandidat.veileder,
    verv: mockKandidat.vervObj,
    yrkeJobbonsker: mockKandidat.yrkeJobbonskerObj,

    // Felter som er mappet om
    adresse: {
        adrlinje1: mockKandidat.adresselinje1,
        adrlinje2: mockKandidat.adresselinje2,
        adrlinje3: mockKandidat.adresselinje3,
        kommunenr: mockKandidat.kommunenummer,
        landkode: mockKandidat.landkode,
        postnr: mockKandidat.postnummer,
        poststednavn: mockKandidat.poststed,
    },
    sprak: mockKandidat.sprak.map((språk) => ({
        beskrivelse: språk.beskrivelse,
        alternativTekst: språk.alternativTekst,
        fraDato: språk.fraDato,
        kompetanseKode: null,
        kompetanseKodeTekst: språk.sprakKodeTekst,
    })),
    sprakferdigheter: mockKandidat.sprak.map((språk) => ({
        sprak: språk.sprakKodeTekst,
        ferdighetMuntlig: språk.ferdighetMuntlig,
        ferdighetSkriftlig: språk.ferdighetSkriftlig,
    })),

    // Felter som er lagt til
    veilederEpost: 'varg.veileder@dev.nav.no',
    veilederNavn: 'Varg Veileder',
};

export const mockAlleKandidatCv = [mockKandidatCv];
