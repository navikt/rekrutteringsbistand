import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './App';
import DevTools from './dev/DevTools';
import faroConfig from './faroConfig';
import { ApplikasjonContextProvider } from './felles/ApplikasjonContext';
import './index.css';
import { VarslingContextProvider } from 'felles/varsling/Varsling';

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
        await mswWorker.start({
            onUnhandledRequest: 'bypass',
        });
    } else {
        return Promise.resolve();
    }
}

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

enableMocking().then(() => {
    root.render(
        <React.StrictMode>
            <SWRConfig
                value={{
                    revalidateOnFocus: false,
                }}
            >
                {import.meta.env.DEV ? <DevTools /> : null}
                <VarslingContextProvider>
                    <ApplikasjonContextProvider>
                        <App />
                    </ApplikasjonContextProvider>
                </VarslingContextProvider>
            </SWRConfig>
        </React.StrictMode>
    );
});
