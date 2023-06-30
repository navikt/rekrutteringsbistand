import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/mock-api');
}

export const Component = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
