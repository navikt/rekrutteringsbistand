import { HttpResponse, delay, http } from 'msw';
import { api } from '../../src/felles/api';
import { mockAvviksrapport } from './mockAvviksrapport';
import { mockAlleKandidatlister, opprettMockKandidatlisteForKandidat } from './mockKandidatliste';
import { mockMineKandidatlister } from './mockMineKandidatlister';

const todo = (info) => new HttpResponse('Mock er ikke implementert', { status: 500 });

export const kandidatApiMock = [
    http.get(`${api.kandidat}/veileder/kandidatlister`, (_) =>
        HttpResponse.json(mockMineKandidatlister)
    ),

    http.get(`${api.kandidat}/veileder/stilling/:stillingsId/kandidatliste`, ({ params }) => {
        const { stillingsId } = params;
        const kandidatlisteMedStilling = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === stillingsId
        );

        return kandidatlisteMedStilling
            ? HttpResponse.json(kandidatlisteMedStilling)
            : new HttpResponse(null, { status: 404 });
    }),

    http.get(`${api.kandidat}/veileder/stilling/:stillingsId/kandidatlisteid`, ({ params }) => {
        const { stillingsId } = params;
        const kandidatlisteMedStilling = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === stillingsId
        );

        return kandidatlisteMedStilling
            ? HttpResponse.json({ kandidatlisteId: 'abc-test-med-stilling' })
            : new HttpResponse(null, { status: 404 });
    }),

    http.get(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId`, ({ params }) => {
        const { kandidatlisteId } = params;
        const kandidatlisteUtenStilling = mockAlleKandidatlister.find(
            (liste) => liste.kandidatlisteId === kandidatlisteId
        );

        return kandidatlisteUtenStilling
            ? HttpResponse.json(kandidatlisteUtenStilling)
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

    http.get(`${api.kandidat}/veileder/kandidater/:kandidatnr/listeoversikt`, ({ params }) => {
        const { kandidatnr } = params;
        const kandidatlister = mockAlleKandidatlister.filter((liste) =>
            liste.kandidater.some((kandidat) => kandidat.kandidatnr === kandidatnr)
        );

        const kandidatlisterMedKandidaten = kandidatlister.map((liste) =>
            opprettMockKandidatlisteForKandidat(
                liste,
                liste.kandidater.find((kandidat) => kandidat.kandidatnr === kandidatnr)
            )
        );

        return HttpResponse.json(kandidatlisterMedKandidaten);
    }),

    http.put(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/eierskap`, todo),

    http.get(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater`,
        todo
    ),

    http.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater`,
        todo
    ),

    http.all(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater/:notatId`,
        todo
    ),

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
        todo
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

    http.post(`${api.kandidat}/avvik`, async () => {
        await delay(1000);
        return HttpResponse.json(mockAvviksrapport);
    }),

    http.get(
        `${api.kandidat}/avvik/:kandidatlisteId`,
        () => new HttpResponse(null, { status: 404 })
    ),
];
