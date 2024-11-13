import * as amplitude from '@amplitude/analytics-browser';
import { Types } from '@amplitude/analytics-browser';
import { Miljø, getMiljø } from './miljø';

export enum AmplitudeEvent {
    Sidevisning = 'sidevisning',
    Navigere = 'navigere',
}

const getApiKey = () => {
    return getMiljø() === Miljø.ProdGcp
        ? 'a8243d37808422b4c768d31c88a22ef4'
        : '6ed1f00aabc6ced4fd6fcb7fcdc01b30';
};

export const setNavKontorForAmplitude = (navKontor: string) => {
    if (import.meta.env.PROD) {
        const nyttIdentitentsObjekt = new amplitude.Identify();
        nyttIdentitentsObjekt.set('navKontor', navKontor);
        client()?.identify(nyttIdentitentsObjekt);
    }
};

export const sendEvent = (område: string, hendelse: string, data?: object) => {
    if (import.meta.env.PROD) {
        client()?.logEvent(['#rekrutteringsbistand', område, hendelse].join('-'), data);
    }
};

export const sendGenerellEvent = (
    event: AmplitudeEvent | string,
    properties: Record<string, any>
) => {
    if (import.meta.env.PROD) {
        const eventProperties = {
            app: 'rekrutteringsbistand',
            ...properties,
        };

        client()?.logEvent(event, eventProperties);
    }
};

export const client = (): Pick<Types.BrowserClient, 'logEvent' | 'identify'> | null => {
    amplitude.init(getApiKey(), undefined, {
        serverUrl: 'https://amplitude.nav.no/collect',
        useBatch: false,
        autocapture: {
            attribution: true,
            fileDownloads: false,
            formInteractions: false,
            pageViews: true,
            sessions: true,
            elementInteractions: false,
        },
    });

    return amplitude;
};
