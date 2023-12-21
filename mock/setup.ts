import { setupWorker } from 'msw/browser';
import mswHandlers from './handlers';

export const mswWorker = setupWorker(...mswHandlers);

mswWorker.start({
    //todo set til warn for console log warnings
    onUnhandledRequest: 'warn',
});
