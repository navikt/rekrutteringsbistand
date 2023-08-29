import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Forside from './Forside';

// Mocker komponenter som ikke er en del av det som testes
vi.mock('./hurtiglenker/Hurtiglenker', () => ({
    default: () => {
        return <div data-testid="mock-hurtiglenker">MOCK-hurtiglenker</div>;
    },
}));

const mockProps = vi.fn(); // lagre props for videre testing

// Mocker komponenter som ikke er en del av det som testes
vi.mock('./statistikk/Statistikk', () => ({
    default: (props) => {
        mockProps(props); // set props sendt ned
        return <div data-testid="mock-statistikk">MOCK-statistikk</div>;
    },
}));

// Render test med router
test('<Forside/>', () => {
    const app = render(<Forside />, { wrapper: BrowserRouter });
    app.getByTestId('mock-hurtiglenker');
    app.getByTestId('mock-statistikk');
    // expect(app).toMatchSnapshot(); // for snapshot testing
});
