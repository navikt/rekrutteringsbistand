import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import {
    KandidatStillingssøkES,
    kandidatStillingssøkEndepunkt,
} from '../../../api/kandidat-søk-api/kandidatStillingssøk';
import KontekstAvKandidat from './KontekstAvKandidat';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

test('<ManglerØnsketYrke/>', async () => {
    // @ts-ignore TODO: written before strict-mode enabled
    global.testServer.use(
        http.post(kandidatStillingssøkEndepunkt, () => {
            const dto = {
                yrkeJobbonskerObj: [],
                arenaKandidatnr: 'PAM0152hb0wr4',
                geografiJobbonsker: [
                    {
                        geografiKodeTekst: 'Norge',
                        geografiKode: 'NO',
                    },
                    {
                        geografiKodeTekst: 'Geiranger',
                        geografiKode: '1000',
                    },
                    {
                        geografiKodeTekst: 'Larvik',
                        geografiKode: 'NO07.0712',
                    },
                ],
                fodselsnummer: '04928797045',
                kommunenummerstring: '0301',
                kommuneNavn: 'Vestvågøy',
            };

            const testSvar: KandidatStillingssøkES = {
                hits: {
                    hits: [
                        {
                            _source: dto,
                        },
                    ],
                },
            };
            return HttpResponse.json(testSvar);
        })
    );

    render(wrapper());
    await waitFor(() => {
        expect(
            screen.getByRole('heading', { name: /vi vet ikke hva kandidaten ønsker å jobbe med/i })
        ).toBeInTheDocument();
    });
});
