import { HttpResponse, http } from 'msw';

const mockDekoratør = {
    ident: 'Z994320',
    navn: 'F_Z994320 E_Z994320',
    fornavn: 'F_Z994320',
    etternavn: 'E_Z994320',
    enheter: [
        {
            enhetId: '1001',
            navn: 'NAV Kristiansand',
        },
        {
            enhetId: '1621',
            navn: 'NAV Ørland',
        },
    ],
};

const mockAktivBruker = { aktivBruker: null, aktivEnhet: '1001' };

export const modiaMock = [
    http.get('/modiacontextholder/api/decorator', (_) => HttpResponse.json(mockDekoratør)),
    http.get('/modiacontextholder/api/context/aktivbruker', (_) =>
        HttpResponse.json(mockDekoratør)
    ),
    http.get('/modiacontextholder/api/context/aktivenhet', (_) =>
        HttpResponse.json(mockAktivBruker)
    ),
];
