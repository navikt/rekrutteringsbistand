import {
    AdminStatus,
    Ansettelsesform,
    Arbeidsgiver,
    Kilde,
    Medium,
    Omfang,
    Privacy,
    Rekrutteringsbistandstilling,
    Status,
    Stillingsinfo,
    Stillingskategori,
    System,
} from 'felles/domene/stilling/Stilling';
import moment from 'moment';
import { mockVeileder } from '../mockVeileder';

const stillingsId = '1ea746af-66be-4cf8-a051-9e815f77b1d1';

const iDag = new Date().toISOString();

export const mockArbeidsgiver: Arbeidsgiver = {
    name: 'TULLEKONTORET AS',
    publicName: 'TULLEKONTORET AS',
    orgnr: '976434099',
    orgform: 'BEDR',
    location: {
        address: 'Lilleakerveien 37D',
        postalCode: '0284',
        county: 'OSLO',
        municipal: 'OSLO',
        municipalCode: '0301',
        city: 'OSLO',
        country: 'NORGE',
        latitude: '59.92172360812686',
        longitude: '10.637563808231683',
    },
    parentOrgnr: '912819973',
};

export const mockStilling /* : Stilling */ = {
    id: 100,
    uuid: stillingsId,
    created: iDag,
    createdBy: System.Rekrutteringsbistand,
    updated: iDag,
    updatedBy: System.Rekrutteringsbistand,
    mediaList: [],
    contactList: [],
    title: 'TITTEL FRA ARBEIDSPLASSEN',
    status: Status.Aktiv,
    privacy: Privacy.Intern,
    source: Kilde.Intern,
    medium: Medium.Dir,
    reference: stillingsId,
    published: iDag,
    expires: moment().add(7, 'days').toISOString(),
    employer: mockArbeidsgiver,
    businessName: 'Tullekontoret',
    firstPublished: true,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
    publishedByAdmin: iDag,
    administration: {
        status: AdminStatus.Done,
        comments: null,
        reportee: `${mockVeileder.fornavn} ${mockVeileder.etternavn}`,
        remarks: [],
        navIdent: 'Z000000',
    },
    categoryList: [
        {
            name: 'Kokk',
            categoryType: 'STYRK08NAV',
        },
    ],
    location: {
        address: null,
        postalCode: null,
        municipal: null,
        municipalCode: null,
        city: null,
        country: null,
        latitude: null,
        longitude: null,
        county: 'NORDLAND',
    },
    locationList: [
        {
            address: null,
            postalCode: null,
            municipal: null,
            municipalCode: null,
            city: null,
            country: null,
            latitude: null,
            longitude: null,
            county: 'NORDLAND',
        },
    ],
    properties: {
        extent: Omfang.Heltid,
        applicationurl: 'www.rekruttering.nav.dev.no',
        workhours: `["Dagtid"]`,
        employerhomepage: 'https://www.tullekontoret.no',
        applicationdue: 'Snarest',
        workday: `["Ukedager"]`,
        jobtitle: 'Uidentifiserbart yrke',
        positioncount: '4',
        engagementtype: Ansettelsesform.Fast,
        employerdescription:
            '<p>Tullekontoret – stolt leverandør av tull og tøys siden 1953. Våre dyktige tøysekopper sørger for at du får den opplevelsen du fortjener.</p>',
        adtext: '<p>Vi trenger flere tøysekopper!</p><h2>Lorem ipsum dolor sit amet</h2><p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>Etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Mauris vitae ultricies leo integer. Feugiat nisl <b>pretium fusce</b> id velit ut tortor pretium.<p>',
        applicationemail: 'tullekontoret@dev.nav.no',
        classification_input_source: 'categoryName',
        sector: 'Offentlig',
        tags: '["TILTAK_ELLER_VIRKEMIDDEL__LÆRLINGPLASS"]',
    },
};

export const mockEksternStilling = {
    stillingsinfo: null,
    stilling: {
        id: 301,
        uuid: 'eksternStilling',
        created: '2024-04-30T08:01:18.201333',
        createdBy: 'import-api',
        updated: '2024-04-30T08:01:29.379318',
        updatedBy: 'import-api',
        title: 'Chef',
        status: 'ACTIVE',
        administration: {
            id: 301,
            status: 'DONE',
            comments: 'Test',
            reportee: 'AUTO',
            remarks: [],
            navIdent: null,
        },
        mediaList: [],
        contactList: [],
        privacy: 'SHOW_ALL',
        source: 'IMPORTAPI',
        medium: 'Staffers AS',
        reference: 'JWNwGsfbnMfwJW2pUmR3',
        published: '2024-04-25T09:41:00',
        expires: '2024-06-20T09:41:00',
        employer: null,
        location: {
            address: 'Vulkan',
            postalCode: '0178',
            county: 'OSLO',
            municipal: 'OSLO',
            municipalCode: '0301',
            city: 'OSLO',
            country: 'NORGE',
            latitude: '59.92257120482907',
            longitude: '10.752370920709733',
        },
        locationList: [
            {
                address: 'Vulkan',
                postalCode: '0178',
                county: 'OSLO',
                municipal: 'OSLO',
                municipalCode: '0301',
                city: 'OSLO',
                country: 'NORGE',
                latitude: '59.92257120482907',
                longitude: '10.752370920709733',
            },
        ],
        categoryList: [
            {
                id: 2285204,
                code: '21838',
                categoryType: 'JANZZ',
                name: 'Sushikokk',
                description: null,
                parentId: null,
            },
            {
                id: 2285206,
                code: '5120',
                categoryType: 'STYRK08',
                name: 'Kokker',
                description: null,
                parentId: null,
            },
        ],
        properties: {
            extent: 'Heltid',
            occupation: 'Chef',
            education: '["Ingen krav"]',
            keywords: 'Kokker;Chef',
            positioncount: '1',
            engagementtype: 'Annet',
            classification_styrk08_score: '0.7002687424958279',
            _approvedby: 'AUTO',
            employerdescription:
                'På den solrike takterrassen til BAR får du fantastisk utsikt over store deler av Oslo. \n\nTakterrassen er åpen i sommermånedene der vår restaurant har plass til 150 gjester ved sittende bespisning eller 200 ved minglemeny.',
            _score: '[{"name":"category","value":-50},{"name":"employer","value":-50},{"name":"sector","value":-10},{"name":"engagementtype","value":-10},{"name":"extent","value":-10},{"name":"jobarrangement","value":-10}]',
            adtext: '<p>We’re looking for a chef with a la carte experience to work at our rooftop terrace this summer.</p>',
            classification_styrk08_code: '5120',
            sourceurl: null,
            workLanguage: 'Engelsk',
            _providerid: '15012',
            jobpercentage: '100%',
            _versionid: '580530',
            applicationurl: null,
            classification_esco_code:
                'http://data.europa.eu/esco/occupation/90f75f67-495d-49fa-ab57-2f320e251d7e',
            classification_input_source: 'occupation',
            _scoretotal: '-140',
            applicationlabel: 'Please, apply through Staffers',
        },
        publishedByAdmin: '2024-04-30T08:01:18.183823',
        businessName: 'BAR Vulkan',
        firstPublished: true,
        deactivatedByExpiry: false,
        activationOnPublishingDate: false,
    },
};

export const mockStillingsinfo: Stillingsinfo = {
    stillingsid: stillingsId,
    stillingsinfoid: '8e74803e-6973-4115-befe-6ee1e0f28533',
    eierNavident: null,
    eierNavn: null,
    stillingskategori: Stillingskategori.Stilling,
};

export const mockRekrutteringsbistandstilling: Rekrutteringsbistandstilling = {
    stilling: mockStilling,
    stillingsinfo: mockStillingsinfo,
};
export const mockRekrutteringsbistandstillingMin: Rekrutteringsbistandstilling = {
    stilling: {
        ...mockStilling,
        uuid: 'minIntern',

        administration: {
            ...mockStilling.administration,
            navIdent: 'Z123456',
        },
    },
    stillingsinfo: {
        ...mockStillingsinfo,
        eierNavident: 'Z123456',
    },
};
export const mockRekrutteringsbistandstillingEkstern = {
    ...mockEksternStilling,
};
export const mockRekrutteringsbistandstillingMinEkstern: any = {
    stilling: {
        ...mockEksternStilling.stilling,
        uuid: 'minEkstern',
        administration: {
            ...mockEksternStilling.stilling.administration,
            navIdent: 'Z123456',
        },
    },
    stillingsinfo: {
        stillingsid: 'eksternStilling',
        stillingsinfoid: 'eksternStilling',
        eierNavident: 'Z123456',
        eierNavn: 'F_123456 E_123456',
        stillingskategori: 'STILLING',
    },
};

export const mockNyRekrutteringsbistandstilling: Rekrutteringsbistandstilling = {
    stilling: {
        ...mockStilling,
        id: 101,
        uuid: '004aa428-8033-404a-bcf2-4dd5e33205c9',
        title: 'TITTEL FRA ARBEIDSPLASSEN',
        administration: {
            status: AdminStatus.Pending,
            comments: null,
            reportee: `${mockVeileder.fornavn} ${mockVeileder.etternavn}`,
            remarks: [],
            navIdent: mockVeileder.navIdent,
        },
        location: null,
        locationList: [],
        properties: {},
        firstPublished: false,
        publishedByAdmin: null,
        businessName: null,
        activationOnPublishingDate: false,
    },
    stillingsinfo: {
        stillingsid: '004aa428-8033-404a-bcf2-4dd5e33205c9',
        stillingsinfoid: 'a22d7b8c-23b4-48e5-9ad0-743e1b1da6b2',
        eierNavn: null,
        eierNavident: null,
        stillingskategori: Stillingskategori.Stilling,
    },
};

export const mockFormidling = {
    stilling: {
        title: 'Formidling',
        uuid: 'formidling',
        annonsenr: '920023',
        status: 'ACTIVE',
        privacy: 'INTERNAL_NOT_SHOWN',
        published: '2024-05-02T15:10:23.086610286',
        publishedByAdmin: '2024-05-02T15:10:23.086610286',
        expires: '2025-05-09T01:00:00',
        created: '2024-05-02T15:09:05.545835',
        updated: '2024-05-02T15:10:23.799186',
        employer: {
            name: 'STRENG KRITISK TIGER AS',
            publicName: 'STRENG KRITISK TIGER AS',
            orgnr: '315090334',
            parentOrgnr: '312468395',
            orgform: 'BEDR',
        },
        categories: [
            {
                styrkCode: '0310.03',
                name: 'Korporal',
            },
        ],
        source: 'DIR',
        medium: 'DIR',
        businessName: 'STRENG KRITISK TIGER AS',
        locations: [
            {
                address: null,
                postalCode: null,
                city: null,
                county: 'AGDER',
                countyCode: null,
                municipal: 'KRISTIANSAND',
                municipalCode: '4204',
                latitue: null,
                longitude: null,
                country: 'NORGE',
            },
        ],
        reference: '69094243-c430-43ea-bbce-a4ad440563cc',
        administration: {
            status: 'DONE',
            remarks: [],
            comments: '',
            reportee: 'MOCK FORMIDLING',
            navIdent: 'Z993141',
        },
        properties: {
            extent: 'Heltid',
            workhours: ['Dagtid'],
            workday: ['Ukedager'],
            applicationdue: 'Snarest',
            jobtitle: 'Korporal',
            positioncount: 1,
            engagementtype: 'Fast',
            classification_styrk08_score: 1,
            adtext: 'Formidling',
            classification_styrk08_code: '0310',
            searchtags: [
                {
                    label: 'Korporal',
                    score: 1,
                },
            ],
            classification_esco_code:
                'http://data.europa.eu/esco/occupation/4a3f40a8-0587-494c-b8d3-7098b8c5992f',
            classification_input_source: 'jobtitle',
            sector: 'Offentlig',
        },
        contacts: [
            {
                name: 'Menig',
                role: '',
                title: 'Forsvar',
                email: 'test@nav.no',
                phone: '',
            },
        ],
        styrkEllerTittel: 'Formidling',
    },
    stillingsinfo: {
        eierNavident: null,
        eierNavn: null,
        notat: null,
        stillingsid: 'formidling',
        stillingsinfoid: '84a1707f-8002-4d10-a9a6-311ce66dd319',
        stillingskategori: 'FORMIDLING',
    },
};

export const mockFormidlingMin = {
    ...mockFormidling,
    stilling: {
        ...mockFormidling.stilling,
        styrkEllerTittel: 'Formidling MIN',
        uuid: 'minFormidling',
        administration: {
            ...mockFormidling.stilling.administration,
            reportee: 'MOCK FORMIDLING MIN',
            navIdent: 'Z123456',
        },
    },
    stillingsinfo: {
        ...mockFormidling.stillingsinfo,
    },
};
