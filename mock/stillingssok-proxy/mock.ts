import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import {
    mockEksternStillingSøk,
    mockFormidlingerSøk,
    mockInternStillingSøk,
    mockMinFormidlingSøk,
    mockMineStillingerSøk,
    mockStillingssøk,
} from './mockStillingssøk';

function findValue(obj: any, keyToFind: string, valueToFind?: string): boolean {
    if (Array.isArray(obj)) {
        return obj.some((item) => findValue(item, keyToFind, valueToFind));
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (key === 'must_not') {
                return false;
            }
            if (typeof obj[key] === 'object') {
                if (findValue(obj[key], keyToFind, valueToFind)) {
                    return true;
                }
            } else if (key === keyToFind) {
                if (valueToFind === undefined || obj[key] === valueToFind) {
                    return true; // Found the key, and optionally the value
                }
            }
        }
    }
    return false;
}

export const stillingssøkMock = [
    http.post(`${api.stillingssøk}/stilling/_search`, async ({ request }) => {
        const body = await request.json();

        if (
            findValue(body, 'stillingsinfo.stillingskategori', 'FORMIDLING') &&
            findValue(body, 'stillingsinfo.eierNavident')
        ) {
            return HttpResponse.json(mockStillingssøk(mockMinFormidlingSøk));
        }

        if (findValue(body, 'stillingsinfo.stillingskategori', 'FORMIDLING')) {
            return HttpResponse.json(mockStillingssøk(mockFormidlingerSøk));
        }

        if (findValue(body, 'stillingsinfo.eierNavident')) {
            return HttpResponse.json(mockStillingssøk(mockMineStillingerSøk));
        }

        return HttpResponse.json(
            mockStillingssøk([
                ...mockInternStillingSøk,
                ...mockEksternStillingSøk,
                ...mockMineStillingerSøk,
            ])
        );
    }),
];
