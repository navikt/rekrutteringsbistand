import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { devFnr } from '../../../dev/DevUtil';
import LeggTilKandidat from './LeggTilKandidat';
import { HttpResponse, http } from 'msw';
import {
    KandidatKilde,
    Kandidatnavn,
    hentNavnEndepunkt,
} from '../../../api/kandidat-søk-api/hentKandidatnavn';
import { hentArenaKandidatnrEndepunkt } from '../../../api/kandidat-søk-api/hentArenaKandidatnr';

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
        // @ts-ignore TODO: written before strict-mode enabled
        global.testServer.use(
            http.post(hentNavnEndepunkt, () => {
                const testSvar: Kandidatnavn = {
                    fornavn: 'Ola',
                    etternavn: 'Nordmann',
                    kilde: KandidatKilde.REKRUTTERINGSBISTAND,
                };
                return HttpResponse.json(testSvar);
            })
        );
        // @ts-ignore TODO: written before strict-mode enabled
        global.testServer.use(
            http.post(hentArenaKandidatnrEndepunkt, () => {
                const testSvar: Kandidatnavn = {
                    fornavn: 'Ola',
                    etternavn: 'Nordmann',
                    kilde: KandidatKilde.REKRUTTERINGSBISTAND,
                };
                return HttpResponse.json({ arenaKandidatnr: 'abc123' });
            })
        );
        const tekstfelt = screen.getByRole('textbox');

        expect(screen.queryByText(/Ola Nordmann/i)).not.toBeInTheDocument();

        userEvent.type(tekstfelt, devFnr.ok);

        await waitFor(() => expect(screen.getByText(/Ola Nordmann/i)).toBeInTheDocument());

        expect(screen.getByRole('button', { name: /legg til/i })).not.toBeDisabled();
    });

    it('Skriver inn for gyldig fødselsnummer, men det finnes ingen kandidat i rekbis', async () => {
        // @ts-ignore TODO: written before strict-mode enabled
        global.testServer.use(
            http.post(hentNavnEndepunkt, () => {
                const testSvar: Kandidatnavn = {
                    fornavn: 'Ola',
                    etternavn: 'Nordmann',
                    kilde: KandidatKilde.PDL,
                };
                return HttpResponse.json(testSvar);
            })
        );

        const tekstfelt = screen.getByRole('textbox');

        userEvent.type(tekstfelt, devFnr.iPDL);

        await waitFor(() =>
            expect(
                screen.getByText(/Kandidaten er ikke synlig i Rekrutteringsbistand/i)
            ).toBeInTheDocument()
        );

        // Viser navn fra PDL
        expect(screen.getByText('Kandidaten er hentet fra folkeregistret')).toBeInTheDocument();

        // Viser knapp for oppslag i synlighetsmotoren
        expect(
            screen.getByRole('button', {
                name: 'Se hvorfor kandidaten ikke er synlig (punkt 1-5)',
            })
        );

        //Viser registrer formidling knapp
        expect(screen.getByRole('button', { name: /Registrer formidling/i }));
    });

    it('Skriver inn for gyldig fødselsnummer, men fødselsnummeret finnes ikke ', async () => {
        // @ts-ignore TODO: written before strict-mode enabled
        global.testServer.use(
            http.post(hentNavnEndepunkt, () => {
                return HttpResponse.text('', { status: 404 });
            })
        );

        const tekstfelt = screen.getByRole('textbox');

        userEvent.type(tekstfelt, devFnr.finnesIkke);

        await waitFor(() =>
            expect(
                screen.getByText(/Finner ikke person knyttet til fødselsnummer/i)
            ).toBeInTheDocument()
        );
    });
});
