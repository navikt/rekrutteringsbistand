import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import FylkerOgKommuner from './FylkerOgKommuner';

describe('FylkerOgKommuner', () => {
    beforeEach(() => {
        render(
            <SWRConfig>
                <BrowserRouter>
                    <FylkerOgKommuner />
                </BrowserRouter>
            </SWRConfig>
        );
    });

    it('Viser fylker checkbox', async () => {
        await waitFor(() => expect(screen.getByText('Akershus')).toBeInTheDocument());
        expect(screen.getByText('Akershus')).toBeInTheDocument();
    });

    it('Viser kommuner for fylke1', async () => {
        await waitFor(() => expect(screen.getByText('Akershus')).toBeInTheDocument());
        userEvent.click(screen.getByText('Akershus'));
        await waitFor(() => expect(screen.getByText('Akershus')).toBeInTheDocument());
    });
});
