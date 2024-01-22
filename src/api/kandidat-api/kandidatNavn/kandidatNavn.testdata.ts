import { faker } from '@faker-js/faker';
import { kandidatNavnDTO } from './kandidatNav.dto';

export function kandidatNavnMockGenerator(): kandidatNavnDTO {
    return {
        fornavn: faker.person.firstName(),
        etternavn: faker.person.lastName(),
        mellomnavn: faker.person.middleName(),
    };
}
