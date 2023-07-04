import { rest } from 'msw';

const minIdent = 'A123456';

const url = {
    modiaContext: `/modiacontextholder/api/context`,
    modiaAktivEnhet: `/modiacontextholder/api/context/aktivenhet`,
    modiaAktivBruker: `/modiacontextholder/api/context/aktivbruker`,
    modiaDecorator: `/modiacontextholder/api/decorator`,
};

const aktivEnhetOgBruker = { aktivBruker: null, aktivEnhet: '0239' };
const decorator = {
    ident: minIdent,
    navn: 'Ola Nordmann',
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    enheter: [
        { enhetId: '0239', navn: 'NAV Hurdal' },
        { enhetId: '0425', navn: 'NAV Åsnes' },
        { enhetId: '0604', navn: 'NAV Kongsberg' },
    ],
};

export const modiaContextHolderMock = [
    rest.get(url.modiaDecorator, (_, res, ctx) => res(ctx.json(decorator))),
    rest.get(url.modiaAktivEnhet, (_, res, ctx) => res(ctx.json(aktivEnhetOgBruker))),

    rest.post(url.modiaContext, (_, res, ctx) => res(ctx.status(201))),
    rest.delete(url.modiaAktivBruker, (_, res, ctx) => res(ctx.status(200))),
];
