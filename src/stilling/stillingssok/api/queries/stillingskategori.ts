import { Stillingskategori } from 'felles/domene/stilling/Stilling';

export const stillingskategori = (stillingskategori: Set<Stillingskategori>) => {
    const skalInkluderes = Array.from(stillingskategori).map((kategori) => ({
        term: {
            'stillingsinfo.stillingskategori': kategori,
        },
    }));

    // Formidlingsside
    if (stillingskategori.has(Stillingskategori.Formidling)) {
        return [
            {
                bool: {
                    should: skalInkluderes,
                },
            },
        ];
    }

    // Stillingsside
    // ingen valgt eller begge valgt (Stilling og Jobbmesse)
    if (
        stillingskategori.size === 0 ||
        (stillingskategori.has(Stillingskategori.Stilling) &&
            stillingskategori.has(Stillingskategori.Jobbmesse))
    ) {
        return [
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
    }

    // Stilling valgt
    if (stillingskategori.has(Stillingskategori.Stilling)) {
        return [
            {
                bool: {
                    must_not: [
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
    }
    // Jobbmesse valgt
    if (stillingskategori.has(Stillingskategori.Jobbmesse)) {
        return [
            {
                bool: {
                    must: [
                        {
                            term: {
                                'stillingsinfo.stillingskategori': Stillingskategori.Jobbmesse,
                            },
                        },
                    ],
                },
            },
        ];
    }
};
