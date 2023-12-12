import { Stillingskategori } from '../../../../felles/domene/stilling/Stilling';
import { stillingskategori } from './stillingskategori';

describe('Test stillingskategori query', () => {
    it('Ved valg FORMIDLING skal bare FORMIDLING vises', () => {
        const valg = new Set([Stillingskategori.Formidling]);
        const resultat = [
            {
                bool: {
                    should: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Formidling,
                            },
                        },
                    ],
                },
            },
        ];
        expect(stillingskategori(valg)).toEqual(resultat);
    });

    it('Ved INGEN VALG eller valg Stilling og Jobbmesse, skal alt uten FORMIDLING vises', () => {
        const valg = new Set([Stillingskategori.Stilling, Stillingskategori.Jobbmesse]);
        const resultat = [
            {
                bool: {
                    must_not: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Formidling,
                            },
                        },
                    ],
                },
            },
        ];
        expect(stillingskategori(valg)).toEqual(resultat);
        expect(stillingskategori(new Set())).toEqual(resultat);
    });

    it('Ved valg stilling skal alt uten FORMIDLING og JOBBMESSE vises', () => {
        const valg = new Set([Stillingskategori.Stilling]);
        const resultat = [
            {
                bool: {
                    must_not: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Formidling,
                            },
                        },
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Jobbmesse,
                            },
                        },
                    ],
                },
            },
        ];
        expect(stillingskategori(valg)).toEqual(resultat);
    });

    it('Ved valg JOBBMESSE skal bare JOBBMESSE vises', () => {
        const valg = new Set([Stillingskategori.Jobbmesse]);
        const resultat = [
            {
                bool: {
                    should: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Jobbmesse,
                            },
                        },
                    ],
                },
            },
        ];
        expect(stillingskategori(valg)).toEqual(resultat);
    });
});
