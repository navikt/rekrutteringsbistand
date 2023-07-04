import App from './App';

if (import.meta.env.VITE_MOCK) {
    // TODO: Flytt mock til fellesmappen.
    // setupMock();
}

export const Component = () => <App />;
