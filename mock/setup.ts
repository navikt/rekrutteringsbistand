import { setupWorker } from 'msw';
import mswHandlers from './handlers';

const worker = setupWorker(...mswHandlers);

worker.start({
    onUnhandledRequest: 'warn',
});
