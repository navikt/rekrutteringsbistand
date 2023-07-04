import { setupWorker } from 'msw';
import { headerMocks } from './headerMocks';

const handlers = [...headerMocks];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'bypass',
});
