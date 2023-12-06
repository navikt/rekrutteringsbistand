import { setupWorker } from 'msw/browser';
import mswHandlers from './handlers';

const worker = setupWorker(...mswHandlers);

worker.start({
    //todo set til warn for console log warnings
    onUnhandledRequest: 'bypass',
});
