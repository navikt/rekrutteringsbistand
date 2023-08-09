import add from 'date-fns/add';
import Stilling, {
    AdminStatus,
    Ansettelsesform,
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

const stillingsId = '1ea746af-66be-4cf8-a051-9e815f77b1d1';
const iDag = new Date().toISOString();

export const mockStilling: Stilling = {
    id: 100,
    uuid: stillingsId,
    created: iDag,
    createdBy: System.Rekrutteringsbistand,
    updated: iDag,
    updatedBy: System.Rekrutteringsbistand,
    mediaList: [],
    contactList: [],
    title: 'Eksempel på intern stilling',
    status: Status.Aktiv,
    privacy: Privacy.Intern,
    source: Kilde.Intern,
    medium: Medium.Dir,
    reference: stillingsId,
    published: iDag,
    expires: add(new Date(), { days: 7 }).toISOString(),
    employer: {
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
    },
    businessName: 'Tullekontoret',
    firstPublished: true,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
    publishedByAdmin: iDag,
    administration: {
        status: AdminStatus.Done,
        comments: null,
        reportee: 'F_Z992776 E_Z992776',
        remarks: [],
        navIdent: 'A123456',
    },

    categoryList: [
        {
            name: 'Kokk',
            styrkCode: '0000.03',
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

export const mockStillingsinfo: Stillingsinfo = {
    stillingsid: stillingsId,
    stillingsinfoid: '8e74803e-6973-4115-befe-6ee1e0f28533',
    notat: 'Notat på stilling',
    eierNavident: null,
    eierNavn: null,
    stillingskategori: Stillingskategori.Stilling,
};

export const mockRekrutteringsbistandstilling: Rekrutteringsbistandstilling = {
    stilling: mockStilling,
    stillingsinfo: mockStillingsinfo,
};
