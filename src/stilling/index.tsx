import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

export const Component = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
