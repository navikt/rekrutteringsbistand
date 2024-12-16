import { KandidatStillingssøkDTO } from './kandidatStillingssøk';
import { Kandidatsammendrag } from './kandidatsammendrag';
import { Innsatsgruppe, KandidatsøkKandidat } from './kandidatsøk';

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
            geografiKodeTekst: 'Viken',
            geografiKode: 'NO30',
        },
        {
            geografiKodeTekst: 'Vestfold og Telemark',
            geografiKode: 'NO38',
        },
        {
            geografiKodeTekst: 'Tønsberg',
            geografiKode: 'NO38.3803',
        },
        {
            geografiKodeTekst: 'Løten',
            geografiKode: 'NO38.0415',
        },
        {
            geografiKodeTekst: 'Norge',
            geografiKode: 'NO',
        },
        {
            geografiKodeTekst: 'Oslo/Bydel St.Hanshaugen',
            geografiKode: 'NO03.03016',
        },
    ],
    kommunenummerstring: '3803',
    kommuneNavn: 'Tønsberg',
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
        innsatsgruppe: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
    },
    {
        yrkeJobbonskerObj: [],
        etternavn: 'Uten tilgang',
        postnummer: '1337',
        arenaKandidatnr: 'utenTilgang',
        kommuneNavn: 'Blærum',
        geografiJobbonsker: [],
        fornavn: 'Kandidat',
        fodselsnummer: '17907096400',
        innsatsgruppe: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
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
        innsatsgruppe: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
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
        innsatsgruppe: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
    },
];
