import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { LagreKandidaterDto } from '../../src/kandidatsok/kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { mockAlleKandidatCv } from './mockKandidatCv';
import { mockAlleKandidatlister } from './mockKandidatliste';
import { mockMineKandidatlister } from './mockMineKandidatlister';

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

    rest.get(`${api.kandidat}/veileder/kandidatsok/hentcv`, (req, res, ctx) => {
        const kandidatNr = req.url.searchParams.get('kandidatnr');
        const kandidatCv = mockAlleKandidatCv.find((cv) => cv.kandidatnummer === kandidatNr);

        return res(kandidatCv ? ctx.json(kandidatCv) : ctx.status(404));
    }),
];
