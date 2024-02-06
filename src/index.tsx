import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './App';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
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
    if (import.meta.env.DEV) {
        const { mswWorker } = await import('../mock/setup');
        mswWorker.start({
            onUnhandledRequest: 'warn',
        });
    } else {
        return Promise.resolve();
    }
}

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

enableMocking().then(() => {
    root.render(
        <SWRConfig
            value={{
                revalidateOnFocus: false,
            }}
        >
            <ApplikasjonContextProvider>
                <React.StrictMode>
                    {import.meta.env.DEV ? (
                        <DevTools>
                            <App />
                        </DevTools>
                    ) : (
                        <App />
                    )}
                </React.StrictMode>
            </ApplikasjonContextProvider>{' '}
        </SWRConfig>
    );
});
