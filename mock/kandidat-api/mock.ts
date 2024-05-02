import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import { mockAlleKandidatlister, mockKandidatlisteMedStilling } from './mockKandidatliste';
import { mockMineKandidatlister } from './mockMineKandidatlister';

const todo = (info: unknown) => new HttpResponse('Mock er ikke implementert', { status: 500 });

export const gammelKandidatApiMock = [
    http.get(`${api.kandidat}/veileder/kandidatlister`, (_) =>
        HttpResponse.json(mockMineKandidatlister)
    ),

    http.get(`${api.kandidat}/veileder/stilling/:stillingsId/kandidatliste`, ({ params }) => {
        const { stillingsId } = params;
        const kandidatlisteMedStilling = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === stillingsId
        );

        if (stillingsId === 'minEkstern') {
            return HttpResponse.json({
                ...mockKandidatlisteMedStilling,
                kandidatlisteId: 'minEkstern',
                stillingId: 'minEkstern',
            });
        }
        if (stillingsId === 'minIntern') {
            return HttpResponse.json({
                ...mockKandidatlisteMedStilling,
                kandidatlisteId: 'minIntern',
                stillingId: 'minIntern',
            });
        }

        return kandidatlisteMedStilling
            ? HttpResponse.json(kandidatlisteMedStilling)
            : new HttpResponse(null, { status: 404 });
    }),

    http.get(`${api.kandidat}/veileder/stilling/:stillingsId/kandidatlisteid`, ({ params }) => {
        const { stillingsId } = params;
        const kandidatlisteMedStilling = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === stillingsId
        );

        if (stillingsId === 'intern') {
            return HttpResponse.json({ kandidatlisteId: 'abc-test-med-stilling' });
        }

        if (stillingsId === 'minIntern') {
            return HttpResponse.json({ kandidatlisteId: 'abc-test-med-stilling' });
        }

        if (stillingsId === 'minEkstern') {
            return HttpResponse.json({ kandidatlisteId: 'abc-test-med-stilling' });
        }

        return kandidatlisteMedStilling
            ? HttpResponse.json({ kandidatlisteId: 'abc-test-med-stilling' })
            : new HttpResponse(null, { status: 404 });
    }),

    http.delete(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId`,
        (_) => new HttpResponse(null, { status: 200 })
    ),

    http.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        async ({ params }) => {
            const { kandidatlisteId } = params;

            if (!kandidatlisteId) {
                return new HttpResponse(null, { status: 404 });
            }

            return new HttpResponse(null, { status: 201 });
        }
    ),

    http.post(
        `${api.kandidat}/veileder/me/kandidatlister`,
        (_) => new HttpResponse(null, { status: 201 })
    ),

    http.put(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/eierskap`, todo),

    http.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/status`,
        todo
    ),

    http.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/utfall`,
        todo
    ),

    http.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/arkivert`,
        todo
    ),

    http.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/deltekandidater`,
        ({ params }) => {
            const { kandidatlisteId } = params;
            const kandidatlisteUtenStilling = mockAlleKandidatlister.find(
                (liste) => liste.kandidatlisteId === kandidatlisteId
            );

            return kandidatlisteUtenStilling
                ? HttpResponse.json(kandidatlisteUtenStilling)
                : new HttpResponse(null, { status: 404 });
        }
    ),

    http.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/formidlingeravusynligkandidat`,
        () => new HttpResponse(null, { status: 201 })
    ),

    http.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/formidlingeravusynligkandidat/:formidlingId/utfall`,
        todo
    ),

    http.put(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/status`, todo),

    http.put(
        `${api.kandidat}/veileder/kandidat/arbeidsgiverliste/:kandidatlisteId/:kandidatnummer`,
        todo
    ),
];
