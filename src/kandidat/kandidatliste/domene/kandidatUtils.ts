import {
    Kandidat,
    Kandidatutfall,
    Utfallsendring,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';

export const hentSisteKandidatutfall = (
    utfall: Kandidatutfall,
    utfallsendringer: Utfallsendring[]
) => {
    return utfallsendringer.find((endring) => endring.utfall === utfall);
};

export const erInaktiv = (kandidat: Kandidat): boolean => kandidat.fodselsnr === null;
