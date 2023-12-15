import { Stillingskategori } from '../../../../felles/domene/stilling/Stilling';
import { stillingskategori } from './stillingskategori';
// eslint-disable-next-line import/no-restricted-paths
import { kunFormidlingSet } from '../../../../formidling/Formidlingssøk';
import { fallbackIngenValgteStillingskategorierSet } from '../../AlleStillinger';

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
        expect(stillingskategori({ valgte: valg, fallbackIngenValgte: kunFormidlingSet })).toEqual(
            resultat
        );
    });

    it('Ved INGEN VALG eller valg Stilling og Jobbmesse, skal alt uten FORMIDLING vises', () => {
        const valg = new Set([Stillingskategori.Stilling, Stillingskategori.Jobbmesse]);
        const resultat = [
            {
                bool: {
                    must_not: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Arbeidstrening,
                            },
                        },
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Formidling,
                            },
                        },
                    ],
                },
            },
        ];
        expect(
            stillingskategori({
                valgte: valg,
                fallbackIngenValgte: fallbackIngenValgteStillingskategorierSet,
            })
        ).toEqual(resultat);
        expect(
            stillingskategori({
                valgte: new Set(),
                fallbackIngenValgte: fallbackIngenValgteStillingskategorierSet,
            })
        ).toEqual(resultat);
    });

    it('Ved valg stilling skal alt uten FORMIDLING og JOBBMESSE vises', () => {
        const valg = new Set([Stillingskategori.Stilling]);
        const resultat = [
            {
                bool: {
                    must_not: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Arbeidstrening,
                            },
                        },
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Jobbmesse,
                            },
                        },
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Formidling,
                            },
                        },
                    ],
                },
            },
        ];
        expect(
            stillingskategori({
                valgte: valg,
                fallbackIngenValgte: fallbackIngenValgteStillingskategorierSet,
            })
        ).toEqual(resultat);
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
        expect(
            stillingskategori({
                valgte: valg,
                fallbackIngenValgte: fallbackIngenValgteStillingskategorierSet,
            })
        ).toEqual(resultat);
    });
});
