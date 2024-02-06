import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { forespørselEndepunkter } from '../../../api/foresporsel-om-deling-av-cv-api/forespørsel.api';
import { SvarstatistikkDTO } from '../../../api/foresporsel-om-deling-av-cv-api/forespørsel.dto';
import Forespørsler, { formaterSomProsentAvTotalen } from './Forespørsler';

describe('<Forespørsler />', () => {
    const navKontor = '1337';
    const fraOgMed = new Date('2021-01-01');
    const tilOgMed = new Date('2021-01-31');

    test('Forespørsler rendrer med forventet data', async () => {
        global.testServer.use(
            http.get(forespørselEndepunkter.statistikk(), () => {
                const testSvar: SvarstatistikkDTO = {
                    antallSvartJa: 111,
                    antallSvartNei: 222,
                    antallUtløpteSvar: 333,
                    antallVenterPåSvar: 444,
                };
                return HttpResponse.json(testSvar);
            })
        );
        render(<Forespørsler navKontor={navKontor} fraOgMed={fraOgMed} tilOgMed={tilOgMed} />);
        await waitFor(() => screen.getByText('Stillinger delt med kandidater i Aktivitetsplanen'));
        expect(
            screen.getByText('Stillinger delt med kandidater i Aktivitetsplanen')
        ).toBeInTheDocument();

        expect(screen.getByText('1110')).toBeInTheDocument();
        expect(screen.getByText('10% svarte ja')).toBeInTheDocument();
        expect(screen.getByText('20% svarte nei')).toBeInTheDocument();
        expect(screen.getByText('30% svarte ikke')).toBeInTheDocument();
    });

    test('formaterSomProsentAvTotalen viser riktig verdi', () => {
        expect(formaterSomProsentAvTotalen(20, 100)).toBe('20%');
        expect(formaterSomProsentAvTotalen(0, 100)).toBe('0%');
    });
});
