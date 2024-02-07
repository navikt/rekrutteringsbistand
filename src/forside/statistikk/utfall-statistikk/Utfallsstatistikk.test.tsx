import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { StatistikkDTO, statistikkEndepunkt } from '../../../api/statistikk-api/statistikk';
import Utfallsstatistikk from './Utfallsstatistikk';

describe('<Forespørsler />', () => {
    const navKontor = '1337';
    const fraOgMed = new Date('2021-01-01');
    const tilOgMed = new Date('2021-01-31');

    test('Forespørsler rendrer med forventet data', async () => {
        // @ts-ignore TODO: written before strict-mode enabled
        global.testServer.use(
            http.get(statistikkEndepunkt(), () => {
                const testSvar: StatistikkDTO = {
                    antFåttJobben: {
                        totalt: 111,
                        under30år: 222,
                        innsatsgruppeIkkeStandard: 333,
                    },
                    antPresentasjoner: {
                        totalt: 444,
                        under30år: 555,
                        innsatsgruppeIkkeStandard: 666,
                    },
                };
                return HttpResponse.json(testSvar);
            })
        );
        render(<Utfallsstatistikk navKontor={navKontor} fraOgMed={fraOgMed} tilOgMed={tilOgMed} />);
        await waitFor(() => {
            expect(screen.getByText('Delt med arbeidsgiver')).toBeInTheDocument();
            expect(screen.getByText('444')).toBeInTheDocument();
            expect(screen.getByText('Fikk jobb')).toBeInTheDocument();
            expect(screen.getByText('111')).toBeInTheDocument();
        });
    });
});
