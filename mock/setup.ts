import { setupWorker } from 'msw/browser';
import mswHandlers from './handlers';

const worker = setupWorker(...mswHandlers);

worker.start({
    onUnhandledRequest: 'warn',
});
