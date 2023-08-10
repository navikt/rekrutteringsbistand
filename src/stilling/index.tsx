import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

// if (import.meta.env.VITE_MOCK) {
//     await import('./mock/mock-api');
// }

export const Component = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
