import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { Rekrutteringsbistandstilling } from 'felles/domene/stilling/Stilling';
import { mockAlleRekrutteringsbistandstillinger } from '../stilling-api/mockStilling';

const mapTilEsRekrutteringsbistandstilling = (
    rekrutteringsbistandstilling: Rekrutteringsbistandstilling
) => ({
    ...rekrutteringsbistandstilling,
    stilling: {
        ...rekrutteringsbistandstilling.stilling,
        annonsenr: String(rekrutteringsbistandstilling.stilling.id),
        categories: rekrutteringsbistandstilling.stilling.categoryList,
        locations: rekrutteringsbistandstilling.stilling.locationList,
        contacts: rekrutteringsbistandstilling.stilling.contactList,
        employer:
            rekrutteringsbistandstilling.stilling.employer === null
                ? null
                : {
                      name: rekrutteringsbistandstilling.stilling.employer.name,
                      publicName: rekrutteringsbistandstilling.stilling.employer.publicName,
                      orgnr: rekrutteringsbistandstilling.stilling.employer.orgnr,
                      parentOrgnr: rekrutteringsbistandstilling.stilling.employer.parentOrgnr,
                      orgform: rekrutteringsbistandstilling.stilling.employer.orgform,
                  },
        properties: {
            ...rekrutteringsbistandstilling.stilling.properties,
            positioncount: Number(rekrutteringsbistandstilling.stilling.properties.positioncount),
            tags: JSON.parse(rekrutteringsbistandstilling.stilling.properties.tags),
            workday: JSON.parse(rekrutteringsbistandstilling.stilling.properties.workday),
            workhours: JSON.parse(rekrutteringsbistandstilling.stilling.properties.workhours),
        },
    },
});

export const mockAlleEsRekrutteringsbistandstillinger: EsRekrutteringsbistandstilling[] =
    mockAlleRekrutteringsbistandstillinger.map(mapTilEsRekrutteringsbistandstilling);
