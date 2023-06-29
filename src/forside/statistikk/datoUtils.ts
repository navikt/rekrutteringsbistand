export const førsteDagIMåned = (dato: Date): Date => {
    dato.setDate(1);
    dato.setHours(0);
    dato.setMinutes(0);
    dato.setSeconds(0);
    dato.setMilliseconds(0);

    return dato;
};

export const sisteDagIMåned = (dato: Date): Date => {
    dato.setMonth(dato.getMonth() + 1);
    dato.setDate(0);

    return dato;
};

export const formaterDatoTilApi = (dato: Date): string => {
    const dag = medNull(dato.getDate());
    const måned = medNull(dato.getMonth() + 1);
    const år = dato.getFullYear();

    return `${år}-${måned}-${dag}`;
};

export const formaterDatoTilVisning = (dato: Date): string => {
    return dato.toLocaleString('nb-NO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const medNull = (n: number) => (n < 10 ? '0' + n : n);
