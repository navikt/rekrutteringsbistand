export enum Retning {
    Stigende = 'asc',
    Synkende = 'desc',
}

export const nesteSorteringsretning = (nåværendeRetning: Retning): Retning => {
    const retninger = [Retning.Stigende, Retning.Synkende];
    const aktivIndex = retninger.indexOf(nåværendeRetning);
    return aktivIndex === retninger.length - 1 ? retninger[0] : retninger[aktivIndex + 1];
};
