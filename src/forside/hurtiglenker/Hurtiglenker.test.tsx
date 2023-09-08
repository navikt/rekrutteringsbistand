import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hurtiglenker from './Hurtiglenker';

test('<Hurtiglenker/>', () => {
    const app = render(<Hurtiglenker />, { wrapper: BrowserRouter });
    expect(app.getAllByRole('link')).toHaveLength(4); // sjekk om Hurtiglenker viser 4 lenker
    // expect(app).toMatchSnapshot(); // for snapshot testing
});
