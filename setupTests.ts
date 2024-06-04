import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import mswHandlers from './mock/handlers';

const testServer = setupServer(...mswHandlers);

global.testServer = testServer;

beforeAll(() => {
    testServer.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => testServer.close());

afterEach(() => {
    testServer.resetHandlers();
});
