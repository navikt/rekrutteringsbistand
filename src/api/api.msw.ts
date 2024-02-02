import { kandidatMockHandlers } from './kandidat-api/kandidat.msw';
import { statistikkMockHandlers } from './statistikk-api/statistikk.msw';

export const apiMockHandlers = [...kandidatMockHandlers, ...statistikkMockHandlers];
