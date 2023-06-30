const ISO_8601_DATE = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;

export function isValidISOString(isoString?: string | null) {
    if (!isoString) return false;

    return ISO_8601_DATE.test(isoString);
}

export function formatISOString(isoString?: string | null, format: string = 'DD.MM.YYYY') {
    try {
        if (isValidISOString(isoString)) {
            const dt = isoString!.split('-');
            if (format === 'DD.MM.YYYY') {
                const day = dt[2].split('T')[0];
                return `${day}.${dt[1]}.${dt[0]}`;
            } else if (format === 'DD.MM.YYYY hh:mm') {
                const day = dt[2].split('T')[0];
                const time = dt[2].split('T')[1];
                return `${day}.${dt[1]}.${dt[0]} ${time.substr(0, 5)}`;
            }
            return isoString;
        }
    } catch (error) {
        return isoString;
    }
    return isoString;
}

export const leggTilTimerPåISOString = (
    datoString: string,
    antallTimerFraMidnatt: number
): string => {
    let dato = new Date(datoString);
    dato.setHours(antallTimerFraMidnatt);
    return dato.toISOString();
};

export const fjernTidspunktFraISOString = (dato: string | undefined) =>
    typeof dato === 'string' ? dato.split('T')[0] : undefined;

export const idagMidnatt = (): Date => {
    const idag = new Date();
    idag.setHours(0);
    idag.setMinutes(0);
    idag.setSeconds(0);
    idag.setMilliseconds(0);
    return idag;
};
