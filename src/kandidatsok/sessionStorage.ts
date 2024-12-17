import { Økt } from './KandidatSøkContext';

export const lesSessionStorage = (sessionStorageKey: string): Økt => {
    const session = window.sessionStorage.getItem(sessionStorageKey);

    if (session) {
        const verdier = JSON.parse(session);

        return verdier;
    } else {
        return {};
    }
};

export const skrivSessionStorage = (sessionStorageKey: string, verdier: Økt) => {
    window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(verdier));
};
