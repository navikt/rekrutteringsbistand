import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const element = document.getElementById('rekrutteringsbistand');
const root = createRoot(element as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
