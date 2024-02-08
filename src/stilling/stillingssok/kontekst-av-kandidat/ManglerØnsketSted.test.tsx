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

test('<ManglerØnsketSted />', async () => {
    // @ts-ignore TODO: written before strict-mode enabled
    global.testServer.use(
        http.post(kandidatStillingssøkEndepunkt, () => {
            const dto = {
                yrkeJobbonskerObj: [
                    {
                        styrkBeskrivelse: 'Avisbud',
                        sokeTitler: [
                            'Avisbud',
                            'Avisbud',
                            'Bilagskontrollør (avisbud)',
                            'Avis- og reklamebrosjyrebud',
                            'Altmuligmann',
                            'Avis- og reklamedistributør',
                            'Utdeler (gratisavis)',
                            'Reklamebud',
                            'Reklame- og avisdistributør',
                            'Bud, utlevering',
                        ],
                        primaertJobbonske: false,
                        styrkKode: null,
                    },
                ],
                arenaKandidatnr: 'PAM0152hb0wr4',
                geografiJobbonsker: [],
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
        expect(screen.getByText('Vi vet ikke hvor kandidaten ønsker å jobbe')).toBeInTheDocument();
    });
});
