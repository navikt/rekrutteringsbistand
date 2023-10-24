import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import { mockStillingssøk } from './mockStillingssøk';

export const stillingssøkMock = [
    http.post(`${api.stillingssøk}/stilling/_search`, () => HttpResponse.json(mockStillingssøk)),
];
