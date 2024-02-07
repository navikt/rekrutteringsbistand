import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import KontekstAvKandidat from './KontekstAvKandidat';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

test('<KontekstAvKandidat/>', async () => {
    render(wrapper());

    await waitFor(() => {
        expect(screen.getByText('Kandidater')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Redd Lukt' })).toBeInTheDocument();
        expect(screen.getByText('Finn stilling')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Redd Lukt' })).toBeInTheDocument();
    });
});
