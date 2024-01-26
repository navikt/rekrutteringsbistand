// FILEPATH: /Users/wiklem/NAV/TOI/rekrutteringsbistand/src/stilling/stilling/legg-til-kandidat/LeggTilKandidat.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { devFnr } from '../../../dev/DevUtil';
import LeggTilKandidat from './LeggTilKandidat';

describe('<LeggTilKandidat />', () => {
    const onCloseMock = vi.fn();
    const testProps = {
        onClose: onCloseMock,
        kandidatlisteId: '123',
        stillingsId: '456',
        erEier: true,
    };

    beforeEach(() => {
        render(<LeggTilKandidat {...testProps} />);
    });

    it('Rendrer initiel visning', () => {
        expect(
            screen.getByText(
                /Før du legger en kandidat på kandidatlisten må du undersøke om personen oppfyller kravene som er nevnt i stillingen./
            )
        ).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        const leggTilKnapp = screen.getByRole('button', { name: /legg til/i });
        expect(leggTilKnapp).toBeDisabled();
        // Expect FødselsnummerTekstfelt.tsx to be in document
        expect(screen.getByText(/Fødselsnummer på kandidaten/i)).toBeInTheDocument();
    });

    it('Trigger onClose når avbryt trykkes', async () => {
        userEvent.click(screen.getByRole('button', { name: /Avbryt/i }));
        await waitFor(() => expect(onCloseMock).toHaveBeenCalled());
    });

    it('Skriver inn for langt fødselsnummer', async () => {
        const tekstfelt = screen.getByRole('textbox');

        userEvent.type(tekstfelt, '123456789012');

        await waitFor(() =>
            expect(screen.getByText(/Fødselsnummeret er for langt/i)).toBeInTheDocument()
        );
    });

    it('Skriver inn for ugyldig fødselsnummer', async () => {
        const tekstfelt = screen.getByRole('textbox');

        userEvent.type(tekstfelt, '11111111111');

        await waitFor(() =>
            expect(screen.getByText(/Fødselsnummeret er ikke gyldig/i)).toBeInTheDocument()
        );
    });

    it('Skriver inn for gyldig fødselsnummer for kandidat i rekrutteringsbistand', async () => {
        const tekstfelt = screen.getByRole('textbox');

        expect(screen.queryByText(/Kandidatnr/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Navn/i)).not.toBeInTheDocument();

        userEvent.type(tekstfelt, devFnr.ok);

        await waitFor(() => expect(screen.getByText(/Kandidatnr/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Navn/i)).toBeInTheDocument());

        expect(screen.getByRole('button', { name: /legg til/i })).not.toBeDisabled();
    });

    it('Skriver inn for gyldig fødselsnummer, men det finnes ingen kandidat i rekbis', async () => {
        const tekstfelt = screen.getByRole('textbox');

        userEvent.type(tekstfelt, devFnr.ingentreff);

        await waitFor(() =>
            expect(
                screen.getByText(/Kandidaten er ikke synlig i Rekrutteringsbistand/i)
            ).toBeInTheDocument()
        );

        // Viser navn fra PDL
        expect(screen.getByText('Navn')).toBeInTheDocument();

        // Viser knapp for oppslag i synlighetsmotoren
        expect(
            screen.getByRole('button', {
                name: 'Se hvorfor kandidaten ikke er synlig (punkt 1-5)',
            })
        );

        //Viser registrer formidling knapp
        expect(screen.getByRole('button', { name: /Registrer formidling for usynlig kandidat/i }));
    });

    it('Skriver inn for gyldig fødselsnummer, men fødselsnummeret finnes ikke ', async () => {
        const tekstfelt = screen.getByRole('textbox');

        userEvent.type(tekstfelt, devFnr.finnesIkke);

        await waitFor(() =>
            expect(
                screen.getByText(/Finner ikke person knyttet til fødselsnummer/i)
            ).toBeInTheDocument()
        );
    });
});
