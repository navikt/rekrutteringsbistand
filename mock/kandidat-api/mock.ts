import { rest } from 'msw';
import {
    mockKandidatliste,
    mockKandidatlisteUtenStilling,
    mockLagringAvKandidaterIKandidatliste,
    mockMineKandidatlister,
} from './mockKandidatlister';
import { LagreKandidaterDto } from '../../src/kandidatsok/kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { api } from '../../src/felles/api';

export const kandidatApiMock = [
    rest.get(`${api.kandidat}/veileder/kandidatlister`, (_, res, ctx) =>
        res(ctx.json(mockMineKandidatlister))
    ),

    rest.get(`${api.kandidat}/veileder/stilling/:stillingsId/kandidatliste`, (_, res, ctx) =>
        res(ctx.json(mockKandidatliste()))
    ),

    rest.get(`${api.kandidat}/veileder/kandidatlister/123`, (_, res, ctx) =>
        res(ctx.json(mockKandidatliste()))
    ),

    rest.get(`${api.kandidat}/veileder/kandidatlister/789`, (_, res, ctx) =>
        res(ctx.json(mockKandidatlisteUtenStilling()))
    ),

    rest.post(
        `${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        async (req, res, ctx) => {
            const lagreKandidaterDto: LagreKandidaterDto = await req.json();

            return res(ctx.json(mockLagringAvKandidaterIKandidatliste(lagreKandidaterDto)));
        }
    ),
];
