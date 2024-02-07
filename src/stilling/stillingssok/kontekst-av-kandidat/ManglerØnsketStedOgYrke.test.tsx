import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import KontekstAvKandidat from './KontekstAvKandidat';
import { kandidatSøkEndepunkter } from '../../../api/kandidat-søk-api/kandidat-søk.api';
import { KandidatStillingssøkDto } from '../../../api/kandidat-søk-api/kandidat-søk-dto';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

test('<ManglerØnsketStedOgYrke/>', async () => {
    global.testServer.use(
        http.post(kandidatSøkEndepunkter.kandidatStillingssøk, () => {
            const dto = {
                yrkeJobbonskerObj: [],
                arenaKandidatnr: 'PAM0152hb0wr4',
                geografiJobbonsker: [],
                fodselsnummer: '04928797045',
                kommunenummerstring: '0301',
                kommuneNavn: 'Vestvågøy',
            };

            const testSvar: KandidatStillingssøkDto = {
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
            screen.getByRole('heading', {
                name: /vi vet ikke hva kandidaten ønsker å jobbe med, eller hvor de ønsker å jobbe/i,
            })
        ).toBeInTheDocument();
    });
});
