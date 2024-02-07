import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HttpResponse, http } from 'msw';
import KontekstAvKandidat from './KontekstAvKandidat';
import { kandidatSøkEndepunkter } from '../../../api/kandidat-søk-api/kandidat-søk.api';
import { KandidatStillingssøkDto } from '../../../api/kandidat-søk-api/kandidat-søk-dto';

const wrapper = () => (
    <BrowserRouter>
        <KontekstAvKandidat kandidatnr="123" />
    </BrowserRouter>
);

test('<ManglerØnsketSted />', async () => {
    global.testServer.use(
        http.post(kandidatSøkEndepunkter.kandidatStillingssøk, () => {
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
        expect(screen.getByText('Vi vet ikke hvor kandidaten ønsker å jobbe')).toBeInTheDocument();
    });
});
