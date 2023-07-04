import { rest } from 'msw';

export const innloggetBrukerMock = [
    rest.get('/meg', (_, res, ctx) =>
        res(
            ctx.json({
                navIdent: 'z994161',
            })
        )
    ),
];
