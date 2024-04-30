import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { Kilde, Medium } from '../../src/felles/domene/stilling/Stilling';
import { mockRekrutteringsbistandstilling, mockStilling } from '../stilling-api/mockStilling';

export const mockEsRekrutteringsbistandstilling: EsRekrutteringsbistandstilling = {
    ...mockRekrutteringsbistandstilling,
    stilling: {
        ...mockStilling,
        uuid: 'intern',
        styrkEllerTittel: 'Intern stilling',
        annonsenr: String(mockStilling.id),
        categories: [
            {
                name: 'Foo',
                styrkCode: '0000.03',
            },
        ],
        locations: mockStilling.locationList,
        contacts: mockStilling.contactList,
        employer: {
            name: mockStilling.employer.name,
            publicName: mockStilling.employer.publicName,
            orgnr: mockStilling.employer.orgnr,
            parentOrgnr: mockStilling.employer.parentOrgnr,
            orgform: mockStilling.employer.orgform,
        },
        properties: {
            ...mockStilling.properties,
            positioncount: Number(mockStilling.properties.positioncount),
            tags: JSON.parse(mockStilling.properties.tags),
            workday: JSON.parse(mockStilling.properties.workday),
            workhours: JSON.parse(mockStilling.properties.workhours),
        },
    },
};

export const mockEsRekrutteringsbistandstillingMin: EsRekrutteringsbistandstilling = {
    ...mockEsRekrutteringsbistandstilling,
    stilling: {
        ...mockEsRekrutteringsbistandstilling.stilling,
        uuid: 'minInterne',
        styrkEllerTittel: 'Intern stilling MIN',
        administration: {
            ...mockEsRekrutteringsbistandstilling.stilling.administration!,
            navIdent: 'Z123456',
        },
    },
    stillingsinfo: {
        ...mockEsRekrutteringsbistandstilling.stillingsinfo!,
        eierNavident: 'Z123456',
    },
};

export const mockEsRekrutteringsbistandstillingEkstern: EsRekrutteringsbistandstilling = {
    ...mockRekrutteringsbistandstilling,
    stilling: {
        ...mockStilling,
        uuid: 'ekstern',
        source: Kilde.Finn,
        medium: Medium.Ass,
        styrkEllerTittel: 'Ekstern stilling',
        annonsenr: String(mockStilling.id),
        categories: [
            {
                name: 'Foo',
                styrkCode: '0000.03',
            },
        ],
        locations: mockStilling.locationList,
        contacts: mockStilling.contactList,
        employer: {
            name: mockStilling.employer.name,
            publicName: mockStilling.employer.publicName,
            orgnr: mockStilling.employer.orgnr,
            parentOrgnr: mockStilling.employer.parentOrgnr,
            orgform: mockStilling.employer.orgform,
        },
        properties: {
            ...mockStilling.properties,
            positioncount: Number(mockStilling.properties.positioncount),
            tags: JSON.parse(mockStilling.properties.tags),
            workday: JSON.parse(mockStilling.properties.workday),
            workhours: JSON.parse(mockStilling.properties.workhours),
        },
    },
};

export const mockEsRekrutteringsbistandstillingEksternMin: EsRekrutteringsbistandstilling = {
    ...mockEsRekrutteringsbistandstillingEkstern,

    stilling: {
        ...mockEsRekrutteringsbistandstillingEkstern.stilling,
        uuid: 'minEksterne',
        styrkEllerTittel: 'Ekstern stilling MIN',
        administration: {
            ...mockEsRekrutteringsbistandstillingEkstern.stilling.administration!,
            navIdent: 'Z123456',
        },
    },
    stillingsinfo: {
        ...mockEsRekrutteringsbistandstillingEkstern.stillingsinfo!,
        eierNavident: 'Z123456',
    },
};
