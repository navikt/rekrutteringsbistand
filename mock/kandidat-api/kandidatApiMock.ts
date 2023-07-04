import { rest } from 'msw';
import { kandidatApi } from '../../src/kandidatsok/api/api';
import {
    mockKandidatliste,
    mockKandidatlisteUtenStilling,
    mockLagringAvKandidaterIKandidatliste,
    mockMineKandidatlister,
} from './mockKandidatlister';
import { LagreKandidaterDto } from '../../src/kandidatsok/kandidatliste/LagreKandidaterIMineKandidatlisterModal';

export const kandidatApiMock = [
    rest.get(`${kandidatApi}/veileder/kandidatlister`, (_, res, ctx) =>
        res(ctx.json(mockMineKandidatlister))
    ),

    rest.get(`${kandidatApi}/veileder/stilling/:stillingsId/kandidatliste`, (_, res, ctx) =>
        res(ctx.json(mockKandidatliste()))
    ),

    rest.get(`${kandidatApi}/veileder/kandidatlister/123`, (_, res, ctx) =>
        res(ctx.json(mockKandidatliste()))
    ),

    rest.get(`${kandidatApi}/veileder/kandidatlister/789`, (_, res, ctx) =>
        res(ctx.json(mockKandidatlisteUtenStilling()))
    ),

    rest.post(
        `${kandidatApi}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        async (req, res, ctx) => {
            const lagreKandidaterDto: LagreKandidaterDto = await req.json();

            return res(ctx.json(mockLagringAvKandidaterIKandidatliste(lagreKandidaterDto)));
        }
    ),
];
