import { Økt } from './KandidatSøkContext';

export const lesSessionStorage = (sessionStorageKey: string): Økt => {
    const session = window.sessionStorage.getItem(sessionStorageKey);

    if (session) {
        const { markerteKandidater, ...verdier } = JSON.parse(session);

        return {
            ...verdier,
            markerteKandidater: new Set(markerteKandidater),
        };
    } else {
        return {};
    }
};

export const skrivSessionStorage = (
    sessionStorageKey: string,
    { markerteKandidater, ...verdier }: Økt
) => {
    window.sessionStorage.setItem(
        sessionStorageKey,
        JSON.stringify({
            ...verdier,
            markerteKandidater: Array.from(markerteKandidater || []),
        })
    );
};
