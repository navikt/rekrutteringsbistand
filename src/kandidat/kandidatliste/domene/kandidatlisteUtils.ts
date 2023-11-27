import Kandidatliste, { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';

export const kandidaterMåGodkjenneDelingAvCv = (kandidatliste: Kandidatliste) => {
    return (
        (kandidatliste.stillingskategori === Stillingskategori.Stilling ||
            kandidatliste.stillingskategori === null) &&
        kandidatliste.stillingId !== null
    );
};

export const erKobletTilStilling = (
    kandidatliste: Kandidatliste | KandidatlisteSammendrag
): boolean => kandidatliste.stillingId !== null;

export const erKobletTilArbeidsgiver = (kandidatliste: Kandidatliste): boolean =>
    kandidatliste.organisasjonReferanse !== null;

export const erEierAvKandidatlisten = (
    kandidatliste: Kandidatliste | KandidatlisteSammendrag
): boolean => kandidatliste.erEier;

export const harTilgangTilkandidatliste = (
    kandidatliste: Kandidatliste | KandidatlisteSammendrag
) => {
    return erEierAvKandidatlisten(kandidatliste);
};
