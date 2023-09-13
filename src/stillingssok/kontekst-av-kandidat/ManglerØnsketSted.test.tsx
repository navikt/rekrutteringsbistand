import { render, screen } from '@testing-library/react';
import { Nettstatus } from 'felles/nettressurs';
import { BrowserRouter } from 'react-router-dom';
import KontekstAvKandidat from './KontekstAvKandidat';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

it('<ManglerØnsketSted/>', () => {
    vi.mock('./useKandidatStillingssøk', () => ({
        __esModule: true,
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
            hentetGeografiFraBosted: true,
            manglerØnsketYrke: false,
        })),
    }));

    render(wrapper());

    expect(screen.getByText('Vi vet ikke hvor kandidaten ønsker å jobbe')).toBeInTheDocument();
});
