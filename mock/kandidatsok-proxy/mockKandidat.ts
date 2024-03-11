import { Omfangenhet, Språkferdighetsnivå } from 'felles/domene/kandidat/Cv';
import { Oppstartkode } from 'felles/domene/kandidat/Jobbprofil';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import {
    Formidlingsgruppe,
    Hovedmål,
    Innsatsgruppe,
} from 'felles/domene/kandidat/Oppfølgingsinformasjon';

import { KandidatStillingssøkDTO } from '../../src/api/kandidat-søk-api/kandidatStillingssøk';
import { Kandidatsammendrag } from '../../src/api/kandidat-søk-api/kandidatsammendrag';
import { mockVeileder } from '../mockVeileder';
import {
    KandidatsøkKandidat,
    Kvalifiseringsgruppekode,
} from '../../src/api/kandidat-søk-api/kandidatsøk';
import { KandidatsøkKandidatNavigering } from '../../src/api/kandidat-søk-api/kandidatsøk-navigering';

export const mockKandidatStillingssøk: KandidatStillingssøkDTO = {
    yrkeJobbonskerObj: [
        {
            styrkBeskrivelse: 'Avisbud',
            sokeTitler: [
                'Avisbud',
                'Avisbud',
                'Bilagskontrollør (avisbud)',
                'Avis- og reklamebrosjyrebud',
                'Altmuligmann',
                'Avis- og reklamedistributør',
                'Utdeler (gratisavis)',
                'Reklamebud',
                'Reklame- og avisdistributør',
                'Bud, utlevering',
            ],
            primaertJobbonske: false,
            styrkKode: null,
        },
    ],
    geografiJobbonsker: [
        {
            geografiKodeTekst: 'Norge',
            geografiKode: 'NO',
        },
        {
            geografiKodeTekst: 'Geiranger',
            geografiKode: '1000',
        },
        {
            geografiKodeTekst: 'Larvik',
            geografiKode: 'NO07.0712',
        },
    ],
    kommunenummerstring: '0301',
    kommuneNavn: 'Vestvågøy',
};

export const mockKandidatsammendrag: Kandidatsammendrag = {
    adresselinje1: 'Kallastenveien 47B',
    veilederVisningsnavn: null,
    fornavn: 'Redd',
    poststed: 'Sarpsborg',
    fodselsdato: '1987-12-04',
    etternavn: 'Lukt',
    epostadresse: 'a@a.com',
    postnummer: '1708',
    telefon: '123123123',
    arenaKandidatnr: 'PAM0152hb0wr4',
    veilederIdent: 'A123123',
    fodselsnummer: '04928797045',
    veilederEpost: 'v@v.com',
};

export const mockKandidatsøkNavigering: KandidatsøkKandidatNavigering = {
    totalHits: '3',
    hits: ['PAM0yp25c81t', 'PAM0164961vts', 'PAM0ylhyjvkv'],
};

export const mockKandidatsøkKandidater: KandidatsøkKandidat[] = [
    {
        yrkeJobbonskerObj: [
            {
                styrkBeskrivelse: 'Sauegjeter',
                sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Saueklipper',
                sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Ullklassifisør',
                sokeTitler: [
                    'Ullklassifisør',
                    'Ullklassifisør',
                    'Ullpresser',
                    'Ullklassifisør, Ullpresse',
                ],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Frisør',
                sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
                primaertJobbonske: false,
                styrkKode: null,
            },
        ],
        etternavn: 'Spasertur',
        postnummer: '3478',
        arenaKandidatnr: 'PAM0yp25c81t',
        kommuneNavn: 'Asker',
        geografiJobbonsker: [
            {
                geografiKodeTekst: 'Hamar',
                geografiKode: 'NO04.0403',
            },
            {
                geografiKodeTekst: 'Råde',
                geografiKode: 'NO30.3017',
            },
            {
                geografiKodeTekst: 'Vestby',
                geografiKode: 'NO02.0211',
            },
        ],
        fornavn: 'Patent',
        fodselsnummer: '17907096467',
        kvalifiseringsgruppekode: Kvalifiseringsgruppekode.Batt,
    },
    {
        yrkeJobbonskerObj: [
            {
                styrkBeskrivelse: 'Sauegjeter',
                sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Frisør',
                sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Saueklipper',
                sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Ullklassifisør',
                sokeTitler: [
                    'Ullklassifisør',
                    'Ullklassifisør',
                    'Ullpresser',
                    'Ullklassifisør, Ullpresse',
                ],
                primaertJobbonske: false,
                styrkKode: null,
            },
        ],
        etternavn: 'Bass',
        postnummer: '3480',
        arenaKandidatnr: 'PAM0164961vts',
        kommuneNavn: 'Asker',
        geografiJobbonsker: [
            {
                geografiKodeTekst: 'Hamar',
                geografiKode: 'NO04.0403',
            },
            {
                geografiKodeTekst: 'Råde',
                geografiKode: 'NO30.3017',
            },
            {
                geografiKodeTekst: 'Vestby',
                geografiKode: 'NO02.0211',
            },
        ],
        fornavn: 'Ufruktbar',
        fodselsnummer: '22899497590',
        kvalifiseringsgruppekode: Kvalifiseringsgruppekode.Batt,
    },
    {
        yrkeJobbonskerObj: [
            {
                styrkBeskrivelse: 'Butikkmedarbeider',
                sokeTitler: [
                    'Butikkmedarbeider',
                    'Butikkmedarbeider',
                    'Butikkbetjent',
                    'Butikkassistent',
                    'Salgsmedarbeider (butikk)',
                    'Selger',
                    'Juniorselger',
                    'Salgsassistent',
                    'Salgsperson',
                    'Salgsmedarbeider',
                    'Salgskraft',
                    'Kundeservicemedarbeider (salg)',
                    'Provisjonsselger',
                    'Rådgivende selger',
                    'Salgs- og kunderådgiver',
                    'Salg- og Kundeservicemedarbeider',
                    'Salgsspesialist',
                    'Salg - Kundebehandler',
                ],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Frisør',
                sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Sauegjeter',
                sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Saueklipper',
                sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Ullklassifisør',
                sokeTitler: [
                    'Ullklassifisør',
                    'Ullklassifisør',
                    'Ullpresser',
                    'Ullklassifisør, Ullpresse',
                ],
                primaertJobbonske: false,
                styrkKode: null,
            },
            {
                styrkBeskrivelse: 'Sykepleier',
                sokeTitler: [
                    'Sykepleier',
                    'Sykepleier',
                    'Offentlig godkjent sykepleier',
                    'Sykepleier ved hjemmetjenesten',
                ],
                primaertJobbonske: false,
                styrkKode: null,
            },
        ],
        etternavn: 'Regle',
        postnummer: '3012',
        arenaKandidatnr: 'PAM0ylhyjvkv',
        kommuneNavn: 'Drammen',
        geografiJobbonsker: [
            {
                geografiKodeTekst: 'Hamar',
                geografiKode: 'NO04.0403',
            },
            {
                geografiKodeTekst: 'Råde',
                geografiKode: 'NO30.3017',
            },
            {
                geografiKodeTekst: 'Vestby',
                geografiKode: 'NO02.0211',
            },
            {
                geografiKodeTekst: 'Drammen',
                geografiKode: 'NO06.0602',
            },
        ],
        fornavn: 'Selvhjulpen',
        fodselsnummer: '10870396894',
        kvalifiseringsgruppekode: Kvalifiseringsgruppekode.Batt,
    },
];

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
    kommuneNavn: 'Vestvågøy',
    postnummer: '0662',
    poststed: 'OSLO',
    adresselinje1: 'Sannergata 2',

    // Oppfølgingsinformasjon
    navkontor: 'NAV Lofoten',
    orgenhet: '1860',
    hovedmaalkode: Hovedmål.SkaffeArbeid,
    kvalifiseringsgruppekode: Innsatsgruppe.SituasjonsbestemtInnsats,
    formidlingsgruppekode: Formidlingsgruppe.Arbeidssøker,
    veileder: mockVeileder.navIdent,

    // Jobbprofil
    yrkeJobbonskerObj: [
        {
            primaertJobbonske: true,
            sokeTitler: ['Gartner'],
            styrkBeskrivelse: 'Gartner',
            styrkKode: '01',
        },
        {
            primaertJobbonske: false,
            sokeTitler: [],
            styrkBeskrivelse: 'Lærer',
            styrkKode: null,
        },
        {
            primaertJobbonske: false,
            sokeTitler: [],
            styrkBeskrivelse: 'Slakter',
            styrkKode: null,
        },
    ],
    geografiJobbonsker: [
        /*{
            geografiKodeTekst: 'Geiranger',
            geografiKode: '1000',
        },
        {
            geografiKodeTekst: 'Larvik',
            geografiKode: 'NO07.0712',
        },
        */
    ],
    arbeidsdagerJobbonskerObj: [],
    oppstartKode: Oppstartkode.EtterAvtale,
    arbeidstidsordningJobbonskerObj: [],
    arbeidstidJobbonskerObj: [
        { arbeidstidKode: 'DAGTID', arbeidstidKodeTekst: 'Dagtid' },
        { arbeidstidKode: 'KVELD', arbeidstidKodeTekst: 'Kveld' },
    ],
    ansettelsesformJobbonskerObj: [
        { ansettelsesformKode: 'FAST', ansettelsesformKodeTekst: 'Fast' },
        { ansettelsesformKode: 'VIKARIAT', ansettelsesformKodeTekst: 'Vikariat' },
    ],
    omfangJobbonskerObj: [
        { omfangKode: 'HELTID', omfangKodeTekst: 'Heltid' },
        { omfangKode: 'DELTID', omfangKodeTekst: 'Deltid' },
    ],

    // Cv
    beskrivelse:
        'Som en dyktig urmaker med 12 års erfaring, har jeg opparbeidet meg omfattende kunnskap og ferdigheter innen reparasjon, vedlikehold og produksjon av ur. Jeg har erfaring med å håndtere en rekke forskjellige typer ur, fra mekaniske klokker til moderne smartklokker. I mitt tidligere arbeid som urmaker har jeg opparbeidet meg en god forståelse av kundens behov, og jeg er alltid forberedt på å yte den beste servicen og kvalitetsarbeidet for å sikre kundetilfredshet. Jeg er også vant til å arbeide effektivt og nøyaktig for å møte stramme tidsfrister.',
    sprak: [
        {
            fraDato: null,
            sprakKode: null,
            sprakKodeTekst: 'Engelsk',
            alternativTekst: 'Engelsk',
            beskrivelse: 'Muntlig: FOERSTESPRAAK Skriftlig: FOERSTESPRAAK',
            ferdighetSkriftlig: Språkferdighetsnivå.Førstespråk,
            ferdighetMuntlig: Språkferdighetsnivå.Førstespråk,
        },
        {
            fraDato: null,
            sprakKode: null,
            sprakKodeTekst: 'Norsk',
            alternativTekst: 'Norsk',
            beskrivelse: 'Muntlig: FOERSTESPRAAK Skriftlig: FOERSTESPRAAK',
            ferdighetSkriftlig: Språkferdighetsnivå.Førstespråk,
            ferdighetMuntlig: Språkferdighetsnivå.Førstespråk,
        },
    ],
    yrkeserfaring: [
        {
            arbeidsgiver: 'Vestfold Anlegg',
            alternativStillingstittel: 'Anleggsmaskinfører/Grunnarbeider lærling',
            styrkKode: '8342.01',
            styrkKodeStillingstittel: 'Anleggsmaskinfører',
            utelukketForFremtiden: false,
            fraDato: '2012-08-02',
            tilDato: null,
            beskrivelse:
                'Jeg har tidligere jobbet som kassadame på Kiwi Supermarked, der jeg betjente kunder på en effektiv og vennlig måte, og behandlet kassatransaksjoner nøyaktig og i samsvar med selskapets retningslinjer. Jeg fulgte sikkerhetsprosedyrer for å beskytte selskapets eiendom og ansatte, og varslet ledelsen om eventuelle avvik eller problemer.',
        },
        {
            arbeidsgiver: 'Meny Larvik sentrum',
            alternativStillingstittel: 'Butikkmedarbeider',
            styrkKode: '5223.02',
            styrkKodeStillingstittel: 'Butikkmedarbeider',
            utelukketForFremtiden: false,
            fraDato: null,
            tilDato: '2012-06-02',
            beskrivelse:
                'Som kassadame var jeg ansvarlig for å utføre kassarelaterte oppgaver som å håndtere vekslepenger, administrere kreditt- og debetkortbetalinger, og opprettholde en ren og organisert kassestasjon. Jeg bidro til å skape et positivt arbeidsmiljø ved å samarbeide med andre ansatte for å sikre at butikken var velorganisert og ren til enhver tid.',
        },
        {
            arbeidsgiver: 'Lars Grimstad, Møbelringen, Larvik',
            alternativStillingstittel: 'lagermedarbeider/sjåfør',
            styrkKode: '4321.01',
            styrkKodeStillingstittel: 'Lagerarbeider',
            utelukketForFremtiden: false,
            fraDato: null,
            tilDato: null,
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'ISAK Norge AS',
            alternativStillingstittel: 'Lager ansvarlig/sjåfør',
            styrkKode: '4322.01',
            styrkKodeStillingstittel: 'Logistiker',
            utelukketForFremtiden: false,
            fraDato: '2008-08-02',
            tilDato: '2009-03-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'Proffice/Ringnes Bryggerier',
            alternativStillingstittel: 'salgsfremmer',
            styrkKode: '5223.02',
            styrkKodeStillingstittel: 'Butikkmedarbeider',
            utelukketForFremtiden: false,
            fraDato: '2001-09-02',
            tilDato: '2002-02-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'Selektiv, Porsgrunn',
            alternativStillingstittel: 'Telefonselger',
            styrkKode: '5223.04',
            styrkKodeStillingstittel: 'Selger detalj non-food',
            utelukketForFremtiden: false,
            fraDato: '2001-12-02',
            tilDato: '2001-12-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'Beha Fabrikker, Porsgrunn',
            alternativStillingstittel: 'Produksjonsmedarbeider',
            styrkKode: '8121.03',
            styrkKodeStillingstittel: 'Operatør metallvareproduksjon',
            utelukketForFremtiden: false,
            fraDato: '2001-11-02',
            tilDato: '2001-11-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'Expert, Porsgrunn',
            alternativStillingstittel: 'lager/truck',
            styrkKode: '4321.01',
            styrkKodeStillingstittel: 'Lagerarbeider',
            utelukketForFremtiden: false,
            fraDato: '2001-07-02',
            tilDato: '2001-09-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'ATG Bergen',
            alternativStillingstittel: 'snekkerarbeid',
            styrkKode: '9313.01',
            styrkKodeStillingstittel: 'Hjelpearbeider bygg',
            utelukketForFremtiden: false,
            fraDato: '1997-04-02',
            tilDato: '1997-08-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'ATG Bergen',
            alternativStillingstittel: 'snekkerarbeid',
            styrkKode: '9313.01',
            styrkKodeStillingstittel: 'Hjelpearbeider bygg',
            utelukketForFremtiden: false,
            fraDato: '1996-12-02',
            tilDato: '1997-03-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'ATG Bergen',
            alternativStillingstittel: 'snekkerarbeid',
            styrkKode: '9313.01',
            styrkKodeStillingstittel: 'Hjelpearbeider bygg',
            utelukketForFremtiden: false,
            fraDato: '1996-05-02',
            tilDato: '1996-09-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'ATG Åsane bydel',
            alternativStillingstittel: 'hjelpearbeider',
            styrkKode: '9313.01',
            styrkKodeStillingstittel: 'Hjelpearbeider bygg',
            utelukketForFremtiden: false,
            fraDato: '1995-08-02',
            tilDato: '1995-10-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'Åsane Hagesenter',
            alternativStillingstittel: 'gartneriassistent',
            styrkKode: '9211.01',
            styrkKodeStillingstittel: 'Innhøstingsarbeider',
            utelukketForFremtiden: false,
            fraDato: '1993-04-02',
            tilDato: '1993-07-02',
            beskrivelse: '',
        },
        {
            arbeidsgiver: 'Flaktveit skole',
            alternativStillingstittel: 'vaktmesterassistent',
            styrkKode: '5153.03',
            styrkKodeStillingstittel: 'Vaktmester',
            utelukketForFremtiden: false,
            fraDato: '1992-10-02',
            tilDato: '1993-01-02',
            beskrivelse: '',
        },
    ],
    utdanning: [
        {
            fraDato: '2013-08-02',
            tilDato: null,
            utdannelsessted: 'Universitetet i Oslo',
            nusKode: '2',
            alternativGrad: 'Universitet',
            yrkestatus: 'INGEN',
            beskrivelse: 'Generisk utdanning fra Blindern',
        },
        {
            fraDato: '1993-08-02',
            tilDato: '1994-06-02',
            utdannelsessted: 'Åsane vgs',
            nusKode: '6',
            alternativGrad: 'Mekaniske fag, grunnkurs',
            yrkestatus: 'INGEN',
            beskrivelse: 'En beskrivelse av Åsage vgs.',
        },
        {
            fraDato: '1989-08-02',
            tilDato: '1992-06-02',
            utdannelsessted: 'Blokkhauen ungdomskole, Bergen',
            nusKode: '2',
            alternativGrad: 'Ungdomskole',
            yrkestatus: 'INGEN',
            beskrivelse: '',
        },
        {
            fraDato: '1970-08-02',
            tilDato: '1979-06-02',
            utdannelsessted: '',
            nusKode: '2',
            alternativGrad: 'Barne og ungdomsskolen i Berlevåg',
            yrkestatus: 'INGEN',
            beskrivelse: '',
        },
    ],
    forerkort: [
        {
            utsteder: null,
            forerkortKode: null,
            forerkortKodeKlasse: 'B - Personbil',
            alternativtNavn: null,
            fraDato: null,
            tilDato: null,
        },
        {
            utsteder: null,
            forerkortKode: null,
            forerkortKodeKlasse: 'B - Personbil',
            alternativtNavn: null,
            fraDato: '2006-02-01',
            tilDato: null,
        },
        {
            utsteder: null,
            forerkortKode: null,
            forerkortKodeKlasse: 'BE - Personbil med tilhenger',
            alternativtNavn: null,
            fraDato: '2012-09-01',
            tilDato: '2112-09-01',
        },
        {
            utsteder: null,
            forerkortKode: null,
            forerkortKodeKlasse: 'C - Lastebil',
            alternativtNavn: null,
            fraDato: '2013-05-01',
            tilDato: '2013-09-01',
        },
    ],
    fagdokumentasjon: [
        { tittel: 'Fagbrev maritime fag', type: 'Fagbrev/svennebrev', beskrivelse: null },
        { tittel: 'Enda noen greier', type: 'Fagbrev/svennebrev', beskrivelse: 'ssas' },
        { tittel: 'Fagbrev sky', type: 'Fagbrev/svennebrev', beskrivelse: 'ssas' },
    ],
    godkjenninger: [
        {
            tittel: 'Førerbevis anleggsmaskinførere: Gravemaskin',
            utsteder: 'testutsteder',
            gjennomfoert: '2010-12-02',
            utloeper: '2118-12-02',
            konseptId: '381828',
        },
        {
            tittel: 'Førerbevis test: test',
            utsteder: 'testutsteder',
            gjennomfoert: '2011-12-02',
            utloeper: '',
            konseptId: '3818',
        },
    ],
    kursObj: [
        {
            arrangor: 'M.E.F',
            tittel: 'Sikkerhetskurs for Maskinfører',
            omfangEnhet: '',
            omfangVerdi: 1,
            fraDato: '2012-09-02',
            tilDato: '2012-10-02',
        },
        {
            arrangor: 'Ifokus',
            tittel: 'Avklaringskurs ',
            omfangEnhet: Omfangenhet.Dag,
            omfangVerdi: 8,
            fraDato: '2011-08-02',
            tilDato: null,
        },
        {
            arrangor: 'ifokus',
            tittel: 'avklaringskurs',
            omfangEnhet: Omfangenhet.Time,
            omfangVerdi: 12,
            fraDato: '2008-06-02',
            tilDato: null,
        },
        {
            arrangor: 'ssaass',
            tittel: 'ss',
            omfangEnhet: Omfangenhet.Måned,
            omfangVerdi: 5,
            fraDato: '2004-01-02',
            tilDato: null,
        },
        {
            arrangor: 'Horten vgs',
            tittel: 'Datakortet',
            omfangEnhet: Omfangenhet.Uke,
            omfangVerdi: 0,
            fraDato: '2002-08-02',
            tilDato: null,
        },
        {
            arrangor: 'aetat',
            tittel: 'Jobbsøkerkurs',
            omfangEnhet: '',
            omfangVerdi: 0,
            fraDato: '1999-10-02',
            tilDato: null,
        },
        {
            arrangor: 'Bmv laksevåg',
            tittel: 'Sveis',
            omfangEnhet: Omfangenhet.Uke,
            omfangVerdi: 3,
            fraDato: '1997-08-02',
            tilDato: null,
        },
    ],
    annenerfaringObj: [
        {
            fraDato: '2004-01-02',
            tilDato: '2006-06-06',
            rolle: 'Erfaring som selger',
            beskrivelse: 'Drev med salg fra tid til annen da jeg gikk på ungdomsskolen.',
        },
    ],
    kompetanseObj: [
        {
            fraDato: null,
            kompKode: null,
            kompKodeNavn: 'Altmuligarbeid langs slakteprosedyren',
            sokeNavn: ['Slakting', 'Flåing'],
            alternativtNavn: 'Altmuligarbeid langs slakteprosedyren',
            beskrivelse: '',
        },
        {
            fraDato: null,
            kompKode: null,
            kompKodeNavn:
                'I stand til å legge til, subtrahere, multiplisere og dividere for kassering',
            sokeNavn: ['Matematikk', 'Summering'],
            alternativtNavn:
                'I stand til å legge til, subtrahere, multiplisere og dividere for kassering',
            beskrivelse: '',
        },
    ],
    samletKompetanseObj: [],
    sertifikatObj: [
        {
            utsteder: 'testutsteder',
            sertifikatKode: '382068',
            sertifikatKodeNavn: 'Truckførerbevis T4',
            alternativtNavn: null,
            fraDato: '2018-02-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: '404866',
            sertifikatKodeNavn: 'Bevis for yrkessjåførkompetanse (YSK)',
            alternativtNavn: null,
            fraDato: '2013-08-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: '381872',
            sertifikatKodeNavn: 'Førerbevis anleggsmaskinførere: Anleggsdumper',
            alternativtNavn: null,
            fraDato: '2013-05-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: '381891',
            sertifikatKodeNavn: 'Førerbevis anleggsmaskinførere: Hjullaster',
            alternativtNavn: null,
            fraDato: '2013-05-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: '381828',
            sertifikatKodeNavn: 'Førerbevis anleggsmaskinførere: Gravemaskin',
            alternativtNavn: null,
            fraDato: '2013-05-02',
            tilDato: null,
        },
        {
            utsteder: 'asss',
            sertifikatKode: '382060',
            sertifikatKodeNavn: 'Truckførerbevis',
            alternativtNavn: null,
            fraDato: '2005-02-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: '416798',
            sertifikatKodeNavn: 'Truckførerbevis: Klasse 10 (tilleggsutstyr)',
            alternativtNavn: null,
            fraDato: '1998-09-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: null,
            sertifikatKodeNavn: null,
            alternativtNavn:
                'Truckførerbevis T3 Svinggaffel og høytløftende plukktruck, sidestablende og førerløftende truck',
            fraDato: '1998-09-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: null,
            sertifikatKodeNavn: null,
            alternativtNavn: 'Truckførerbevis T2 Skyvemasttruck, støttebenstruck',
            fraDato: '1998-09-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: null,
            sertifikatKodeNavn: null,
            alternativtNavn:
                'Truckførerbevis T1 Lavtløftende plukktruck, palletruck m/perm. førerplass',
            fraDato: '1998-09-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: null,
            sertifikatKodeNavn: null,
            alternativtNavn: 'Truckførerbevis T4 Motvektstruck',
            fraDato: '1998-09-02',
            tilDato: null,
        },
        {
            utsteder: '',
            sertifikatKode: '382283',
            sertifikatKodeNavn: 'Truckførerbevis T3',
            alternativtNavn: null,
            fraDato: '2017-06-02',
            tilDato: '2017-06-02',
        },
    ],
    vervObj: [],
    perioderMedInaktivitet: [],
    veilederIdent: 'Z994162',
    veilederVisningsnavn: 'Varg Veileder',
    veilederEpost: 'varg.veileder@dev.nav.no',

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

export const mockAlleKandidater = [mockKandidat];
