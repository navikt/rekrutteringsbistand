import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hurtiglenker from './Hurtiglenker';

test('<Hurtiglenker/>', () => {
    const app = render(<Hurtiglenker />, { wrapper: BrowserRouter });
    expect(app.getAllByRole('link')).toHaveLength(4);
    expect(app).toMatchSnapshot();
});
