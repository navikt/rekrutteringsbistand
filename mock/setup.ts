import { setupWorker } from 'msw/browser';

export const mswWorker = setupWorker();

mswWorker.start({
    //todo set til warn for console log warnings
    onUnhandledRequest: 'warn',
});
