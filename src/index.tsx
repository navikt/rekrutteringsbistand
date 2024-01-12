import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DevTools from './dev/DevTools';
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

async function enableMocking() {
    if (!import.meta.env.DEV) {
        return;
    }
    const { mswWorker } = await import('../mock/setup');
    mswWorker.start({
        onUnhandledRequest: 'warn',
    });
}

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

enableMocking().then(() => {
    root.render(
        <React.StrictMode>
            {import.meta.env.DEV ? (
                <DevTools>
                    <App />
                </DevTools>
            ) : (
                <App />
            )}
        </React.StrictMode>
    );
});
