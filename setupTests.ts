import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import mswHandlers from './mock/handlers';

vi.mock('zustand');

const testServer = setupServer(...mswHandlers);

global.testServer = testServer;

beforeAll(() => {
    testServer.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => testServer.close());

afterEach(() => {
    testServer.resetHandlers();
});
