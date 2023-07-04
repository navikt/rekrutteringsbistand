import { rest } from 'msw';
import { api } from '../src/felles/api';

export const innloggetBrukerMock = [
    rest.get(api.innloggetBruker, (_, res, ctx) =>
        res(
            ctx.json({
                navIdent: 'z994161',
            })
        )
    ),
];
