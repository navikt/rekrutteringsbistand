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
        await waitFor(() => expect(screen.getByText('Fylke 1')).toBeInTheDocument());
        expect(screen.getByText('Fylke 1')).toBeInTheDocument();
    });

    it('Viser kommuner for fylke1', async () => {
        await waitFor(() => expect(screen.getByText('Fylke 1')).toBeInTheDocument());
        userEvent.click(screen.getByText('Fylke 1'));
        await waitFor(() => expect(screen.getByText('Kommune1')).toBeInTheDocument());
    });
});
