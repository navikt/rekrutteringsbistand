import Kandidat from 'felles/domene/kandidat/Kandidat';
import {
    Formidlingsgruppe,
    Hovedmål,
    Innsatsgruppe,
} from 'felles/domene/kandidat/Oppfølgingsinformasjon';
import { mockMeg } from '../meg/mock';

export const mockKandidat: Kandidat = {
    // Personalia
    fornavn: 'Jarle',
    etternavn: 'Jobbsøker',
    fodselsdato: '1961-08-25T22:00:00.000+00:00',
    epostadresse: 'jarle.jobbsoker@dev.nav.no',
    telefon: '91333532',

    // Id
    aktorId: '1000102960567',
    fodselsnummer: '14114536327',
    arenaKandidatnr: 'AB123456',
    kandidatnr: 'AB123456',

    // Geografi
    kommunenummer: 301,
    kommunenummerstring: '0301',
    postnummer: '0662',
    poststed: 'OSLO',
    adresselinje1: 'Sannergata 2',

    // Oppfølgingsinformasjon
    navkontor: 'NAV Lofoten',
    orgenhet: '1860',
    hovedmaalkode: Hovedmål.SkaffeArbeid,
    kvalifiseringsgruppekode: Innsatsgruppe.SituasjonsbestemtInnsats,
    formidlingsgruppekode: Formidlingsgruppe.Arbeidssøker,
    veileder: mockMeg.navIdent,

    // Jobbprofil
    yrkeJobbonskerObj: [
        {
            primaertJobbonske: true,
            sokeTitler: ['Gartner'],
            styrkBeskrivelse: 'Gartner',
            styrkKode: '01',
        },
    ],
    geografiJobbonsker: [
        {
            geografiKodeTekst: 'Geiranger',
            geografiKode: '1000',
        },
    ],
    arbeidsdagerJobbonskerObj: [],
    oppstartKode: null,
    arbeidstidsordningJobbonskerObj: [],
    arbeidstidJobbonskerObj: [],
    ansettelsesformJobbonskerObj: [],
    omfangJobbonskerObj: [],

    // Cv
    beskrivelse:
        'Som en dyktig urmaker med 12 års erfaring, har jeg opparbeidet meg omfattende kunnskap og ferdigheter innen reparasjon, vedlikehold og produksjon av ur. Jeg har erfaring med å håndtere en rekke forskjellige typer ur, fra mekaniske klokker til moderne smartklokker. I mitt tidligere arbeid som urmaker har jeg opparbeidet meg en god forståelse av kundens behov, og jeg er alltid forberedt på å yte den beste servicen og kvalitetsarbeidet for å sikre kundetilfredshet. Jeg er også vant til å arbeide effektivt og nøyaktig for å møte stramme tidsfrister.',
    sprak: [],
    yrkeserfaring: [],
    utdanning: [],
    forerkort: [],
    fagdokumentasjon: [],
    godkjenninger: [],
    kursObj: [],
    annenerfaringObj: [],
    kompetanseObj: [],
    samletKompetanseObj: [],
    sertifikatObj: [],
    vervObj: [],
    perioderMedInaktivitet: [],

    // Ubrukte felter
    totalLengdeYrkeserfaring: 0,
    samtykkeStatus: 'G',
    samtykkeDato: '2019-01-29T15:19:28.361+00:00',
    harKontaktinformasjon: true,
    tidsstempel: new Date().toISOString(),
    adresselinje2: '',
    adresselinje3: '',
    doed: false,
    frKode: '0',
    fylkeNavn: 'Nordland',
    kommuneNavn: 'Vestvågøy',
    kommunenummerkw: 301,
    fodselsdatoErDnr: false,
    synligForArbeidsgiverSok: true,
    synligForVeilederSok: true,

    // Utgåtte felter
    mobiltelefon: null,
    statsborgerskap: null,
    disponererBil: null,
    landkode: null,
    fritattAgKandidatsok: null,
    fritattKandidatsok: null,
};
