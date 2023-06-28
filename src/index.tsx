import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

const setupMock = async () => {
    await import('./header/mock/mock-api');
};

if (import.meta.env.VITE_MOCK) {
    setupMock();
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
