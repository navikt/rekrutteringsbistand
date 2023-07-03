import { Provider } from 'react-redux';
import store from './state/reduxStore';
import App from './app/App';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/mock-api');
}

export const Component = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
