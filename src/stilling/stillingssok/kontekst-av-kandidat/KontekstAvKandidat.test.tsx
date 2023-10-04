import { render, screen } from '@testing-library/react';
import { Nettstatus } from 'felles/nettressurs';
import { BrowserRouter } from 'react-router-dom';
import KontekstAvKandidat from './KontekstAvKandidat';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

test('<KontekstAvKandidat/>', () => {
    vi.mock('./useKandidatStillingssøk', () => ({
        default: vi.fn(() => ({
            kandidat: {
                kind: Nettstatus.Suksess,
                data: {
                    arenaKandidatnr: '123',
                    fodselsnummer: '12345678901',
                    fornavn: 'Ola',
                    etternavn: 'Nordmann',
                },
            },
            hentetGeografiFraBosted: false,
            manglerØnsketYrke: false,
        })),
    }));

    render(wrapper());

    expect(screen.getByText('Kandidater')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ola Nordmann' })).toBeInTheDocument();
    expect(screen.getByText('Finn stilling')).toBeInTheDocument();
});
