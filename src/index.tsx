import React from 'react';
import { createRoot } from 'react-dom/client';
import { Modal } from '@navikt/ds-react';
import App from './App';
import './index.css';

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
