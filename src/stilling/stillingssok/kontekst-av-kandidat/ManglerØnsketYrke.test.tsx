import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import KontekstAvKandidat from './KontekstAvKandidat';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

test('<ManglerØnsketYrke/>', () => {
    vi.mock('./useKandidatStillingssøk', () => ({
        default: vi.fn(() => ({
            kandidatStillingssøk: {
                arenaKandidatnr: '123',
                fodselsnummer: '12345678901',
                fornavn: 'Ola',
                etternavn: 'Nordmann',
            },
            hentetGeografiFraBosted: false,
            manglerØnsketYrke: true,
        })),
    }));

    render(wrapper());

    expect(
        screen.getByRole('heading', { name: /vi vet ikke hva kandidaten ønsker å jobbe med/i })
    ).toBeInTheDocument();
});
