import Kandidatliste, {
    KandidatlisteSammendrag,
    Stillingskategori,
} from 'felles/domene/kandidatliste/Kandidatliste';

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

export const erEierAvKandidatlisten = (kandidatliste: Kandidatliste): boolean =>
    kandidatliste.kanEditere;
