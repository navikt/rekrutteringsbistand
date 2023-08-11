import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import faroConfig from './faroConfig';
import './index.css';

if (import.meta.env.PROD || import.meta.env.VITE_LOKAL_FARO) {
    initializeFaro({
        url: faroConfig.telemetryCollectorURL,
        app: faroConfig.app,
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: true,
            }),
            new TracingInstrumentation(),
        ],
    });
}

if (import.meta.env.VITE_MOCK) {
    await import('../mock/setup');
}

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

Modal.setAppElement(element);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
