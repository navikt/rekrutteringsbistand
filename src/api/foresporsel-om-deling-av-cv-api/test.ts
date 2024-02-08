/**
 * Endepunkt /test
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { getAPI } from '../fetcher';

const testEndepunkt = '/test';

export interface TestDTO {}

export interface TestProps {}

export const useTest = () => {
    const swrData = useSWR(testEndepunkt, getAPI);
    return {
        ...swrData,
    };
};

const testMock: TestDTO = {};

export const testMockMsw = http.get(testEndepunkt, (_) => HttpResponse.json(testMock));
