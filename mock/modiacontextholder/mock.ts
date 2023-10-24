import { HttpResponse, http } from 'msw';

const minIdent = 'A123456';

const url = {
    modiaContext: `/modiacontextholder/api/context`,
    modiaAktivEnhet: `/modiacontextholder/api/context/aktivenhet`,
    modiaAktivBruker: `/modiacontextholder/api/context/aktivbruker`,
    modiaDecorator: `/modiacontextholder/api/decorator`,
};

const aktivEnhet = { aktivBruker: null, aktivEnhet: '0239' };
const aktivBruker = { aktivBruker: '123', aktivEnhet: null };

const decorator = {
    ident: minIdent,
    navn: 'Ola Nordmann',
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    enheter: [
        { enhetId: '0239', navn: 'NAV Hurdal' },
        { enhetId: '0425', navn: 'NAV Åsnes' },
        { enhetId: '0501', navn: 'NAV Lillehammer-Gausdal' },
    ],
};

export const modiaContextHolderMock = [
    http.get(url.modiaDecorator, () => HttpResponse.json(decorator)),
    http.get(url.modiaAktivEnhet, () => HttpResponse.json(aktivEnhet)),
    http.get(url.modiaAktivBruker, () => HttpResponse.json(aktivBruker)),

    http.post(url.modiaContext, () => new HttpResponse(null, { status: 201 })),
    http.delete(url.modiaAktivBruker, () => new HttpResponse(null, { status: 200 })),
];
