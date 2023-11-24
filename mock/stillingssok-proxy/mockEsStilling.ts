import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { mockRekrutteringsbistandstilling, mockStilling } from '../stilling-api/mockStilling';

export const mockEsRekrutteringsbistandstilling: EsRekrutteringsbistandstilling = {
    ...mockRekrutteringsbistandstilling,
    stilling: {
        ...mockStilling,
        styrkEllerTittel: 'styrk eller tittel kommer her',
        annonsenr: String(mockStilling.id),
        categories: mockStilling.categoryList,
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
