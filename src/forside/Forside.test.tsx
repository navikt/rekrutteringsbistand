import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Forside from './Forside';

vi.mock('./hurtiglenker/Hurtiglenker', () => ({
    default: () => {
        return <div data-testid="mock-hurtiglenker">MOCK-hurtiglenker</div>;
    },
}));

const mockProps = vi.fn();
vi.mock('./statistikk/Statistikk', () => ({
    default: (props) => {
        mockProps(props);
        console.log('🎺 props', props);
        return <div data-testid="mock-statistikk">MOCK-statistikk</div>;
    },
}));

test('<Forside/>', () => {
    const app = render(<Forside />, { wrapper: BrowserRouter });
    app.getByTestId('mock-hurtiglenker');
    app.getByTestId('mock-statistikk');
    expect(app).toMatchSnapshot();
});
