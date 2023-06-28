import React from 'react';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

const history = createBrowserHistory();

const setupMock = async () => {
    await import('./header/mock/mock-api');
};

if (import.meta.env.VITE_MOCK) {
    setupMock();
}

root.render(
    <React.StrictMode>
        <App history={history} />
    </React.StrictMode>
);
