import Kandidatliste, { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { mockAlleKandidatlister } from './mockKandidatliste';

export const mockMineKandidatlister: {
    liste: KandidatlisteSammendrag[];
    antall: number;
} = {
    liste: mockAlleKandidatlister.map(tilKandidatlistesammendrag),
    antall: mockAlleKandidatlister.length,
};

function tilKandidatlistesammendrag(kandidatliste: Kandidatliste): KandidatlisteSammendrag {
    const sammendrag = {
        ...kandidatliste,
    };

    delete sammendrag.kandidater;

    return {
        ...sammendrag,
        antallKandidater: kandidatliste.kandidater.length,
        antallUsynligeKandidater: kandidatliste.formidlingerAvUsynligKandidat.length,
    };
}
