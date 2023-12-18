import { Stillingskategori } from 'felles/domene/stilling/Stilling';

type IStillingskategori = {
    fallbackIngenValgte: Set<Stillingskategori>;
    valgte: Set<Stillingskategori>;
};

export const stillingskategori = ({ valgte, fallbackIngenValgte }: IStillingskategori) => {
    if (valgte.size === 0) {
        valgte = fallbackIngenValgte;
    }

    /** Filtrering på stillingskategori (`stillingsinfo.stillingskategori`) kan ikke gjøres naivt:
     *  - eksterne stillinger uten kandidatlister har ingen kategori (`stillingsinfo` er null).
     *  - elasticsearch skiller ikke mellom null og om felt mangler.
     *
     * Vi filtrere derfor på stillingskategori på to måter:
     * 1. Om stillinger skal være en del av resultatet, filtrerer vi bort det som ikke er valgt.
     * 2. Om stillinger ikke skal være en del av resultatet, filtrerer man direkte på det som er valgt.
     */

    if (valgte.has(Stillingskategori.Stilling)) {
        const ikkeValgte = motsatteValg(valgte);
        return ekskluderKategorier(ikkeValgte);
    } else {
        return visKunKategorier(valgte);
    }
};

const motsatteValg = (valgteKategorier: Set<Stillingskategori>) => {
    const alleKategorier = Object.values(Stillingskategori);
    return new Set(alleKategorier.filter((kategori) => !valgteKategorier.has(kategori)));
};

const visKunKategorier = (stillingskategorier: Set<Stillingskategori>) => [
    {
        bool: {
            should: [...stillingskategorier].map((kategori) => ({
                term: {
                    'stillingsinfo.stillingskategori': kategori,
                },
            })),
        },
    },
];

const ekskluderKategorier = (stillingskategorier: Set<Stillingskategori>) => [
    {
        bool: {
            must_not: [...stillingskategorier].map((kategori) => ({
                term: {
                    'stillingsinfo.stillingskategori': kategori,
                },
            })),
        },
    },
];
