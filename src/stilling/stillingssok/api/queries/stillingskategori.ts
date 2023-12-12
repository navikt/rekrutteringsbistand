import { Stillingskategori } from 'felles/domene/stilling/Stilling';

const mapKategori = (stillingskategori: Set<Stillingskategori>) =>
    Array.from(stillingskategori).map((kategori) => ({
        term: {
            'stillingsinfo.stillingskategori': kategori,
        },
    }));

const skalInkludere = (stillingskategori: Set<Stillingskategori>) => {
    return [
        {
            bool: {
                should: mapKategori(stillingskategori),
            },
        },
    ];
};

const skalEkskludere = (stillingskategori: Set<Stillingskategori>) => {
    return [
        {
            bool: {
                must_not: mapKategori(stillingskategori),
            },
        },
    ];
};

export const stillingskategori = (stillingskategori: Set<Stillingskategori>) => {
    // Formidlingsside
    if (stillingskategori.has(Stillingskategori.Formidling)) {
        return skalInkludere(stillingskategori);
    }
    // Stillingsside
    // ingen valgt eller begge valgt (Stilling og Jobbmesse)
    if (
        stillingskategori.size === 0 ||
        (stillingskategori.has(Stillingskategori.Stilling) &&
            stillingskategori.has(Stillingskategori.Jobbmesse))
    ) {
        return skalEkskludere(new Set([Stillingskategori.Formidling]));
    }
    // Stilling valgt
    if (stillingskategori.has(Stillingskategori.Stilling)) {
        return skalEkskludere(new Set([Stillingskategori.Formidling, Stillingskategori.Jobbmesse]));
    }
    // Jobbmesse valgt
    if (stillingskategori.has(Stillingskategori.Jobbmesse)) {
        return skalInkludere(stillingskategori);
    }
};
