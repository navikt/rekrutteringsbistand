import Forside from './Forside';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/mock-api');
}

export const Component = () => <Forside />;
