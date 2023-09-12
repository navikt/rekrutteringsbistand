import { ResponseFunction, RestContext, RestRequest, rest } from 'msw';
import { api } from '../../src/felles/api';
import { LagreKandidaterDto } from '../../src/kandidatsok/kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { mockAlleKandidatlister, opprettMockKandidatlisteForKandidat } from './mockKandidatliste';
import { mockMineKandidatlister } from './mockMineKandidatlister';

const todo = (req: RestRequest, res: ResponseFunction, ctx: RestContext) =>
    res(ctx.status(500, 'Mock er ikke implementert'));

export const kandidatApiMock = [
    rest.get(`${api.kandidat}/veileder/kandidatlister`, (_, res, ctx) =>
        res(ctx.json(mockMineKandidatlister))
    ),

    rest.get(`${api.kandidat}/veileder/stilling/:stillingsId/kandidatliste`, (req, res, ctx) => {
        const kandidatlisteMedStilling = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === req.params.stillingsId
        );

        return res(kandidatlisteMedStilling ? ctx.json(kandidatlisteMedStilling) : ctx.status(404));
    }),

    rest.get(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId`, (req, res, ctx) => {
        const kandidatlisteUtenStilling = mockAlleKandidatlister.find(
            (liste) => liste.kandidatlisteId === req.params.kandidatlisteId
        );

        return res(
            kandidatlisteUtenStilling ? ctx.json(kandidatlisteUtenStilling) : ctx.status(404)
        );
    }),

    rest.delete(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId`, (_, res, ctx) =>
        res(ctx.status(200))
    ),

    rest.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        async (req, res, ctx) => {
            const lagreKandidaterDto: LagreKandidaterDto = await req.json();

            const kandidatliste = mockAlleKandidatlister.find(
                (liste) => liste.kandidatlisteId === req.params.kandidatlisteId
            );

            if (!kandidatliste) {
                return res(ctx.status(404));
            }

            const oppdatertListe = {
                ...kandidatliste,
                kandidater: [
                    ...kandidatliste.kandidater,
                    ...lagreKandidaterDto.map((k) => ({ kandidatnr: k.kandidatnr })),
                ] as any,
            };

            return res(ctx.json(oppdatertListe));
        }
    ),

    rest.post(`${api.kandidat}/veileder/me/kandidatlister`, (_, res, ctx) => res(ctx.status(201))),

    rest.get(`${api.kandidat}/veileder/kandidater/:kandidatnr/listeoversikt`, (req, res, ctx) => {
        const kandidatlister = mockAlleKandidatlister.filter((liste) =>
            liste.kandidater.some((kandidat) => kandidat.kandidatnr === req.params.kandidatnr)
        );

        const kandidatlisterMedKandidaten = kandidatlister.map((liste) =>
            opprettMockKandidatlisteForKandidat(
                liste,
                liste.kandidater.find((kandidat) => kandidat.kandidatnr === req.params.kandidatnr)
            )
        );

        return res(ctx.json(kandidatlisterMedKandidaten));
    }),

    rest.put(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/eierskap`, todo),

    rest.get(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater`,
        todo
    ),

    rest.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater`,
        todo
    ),

    rest.all(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater/:notatId`,
        todo
    ),

    rest.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/status`,
        todo
    ),

    rest.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/utfall`,
        todo
    ),

    rest.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/arkivert`,
        todo
    ),

    rest.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/deltekandidater`,
        (req, res, ctx) => {
            const kandidatlisteUtenStilling = mockAlleKandidatlister.find(
                (liste) => liste.kandidatlisteId === req.params.kandidatlisteId
            );

            return res(
                kandidatlisteUtenStilling ? ctx.json(kandidatlisteUtenStilling) : ctx.status(404)
            );
        }
    ),

    rest.get(`${api.kandidat}/veileder/kandidater/navn`, todo),

    rest.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/formidlingeravusynligkandidat`,
        todo
    ),

    rest.put(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/formidlingeravusynligkandidat/:formidlingId/utfall`,
        todo
    ),

    rest.put(`${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/status`, todo),

    rest.put(
        `${api.kandidat}/veileder/kandidat/arbeidsgiverliste/:kandidatlisteId/:kandidatnummer`,
        todo
    ),
];
