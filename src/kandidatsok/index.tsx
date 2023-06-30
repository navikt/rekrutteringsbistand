import App from './App';
import { setupMock } from './mocks/mockSetup';

if (import.meta.env.VITE_MOCK) {
    setupMock();
}

export const Component = () => <App />;
