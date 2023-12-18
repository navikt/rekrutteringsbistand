export const storForbokstav = (s: string | null) => {
    if (s === null || s.length === 0) {
        return s;
    }

    const ord = s.split(' ');
    return ord
        .map((o) => (o.length === 0 ? o : o[0].toUpperCase() + o.substring(1).toLowerCase()))
        .join(' ');
};

export const lenkeTilKandidat = (kandidatnr: string, kandidatlisteId?: string) => {
    let lenke = `/kandidater/kandidat/${kandidatnr}/cv?fraKandidatsok=true`;

    if (kandidatlisteId) {
        lenke += `&kandidatlisteId=${kandidatlisteId}`;
    }

    return lenke;
};
