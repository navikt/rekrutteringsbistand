import Kandidatliste, {
    KanSletteKandidatliste,
    Kandidatlistestatus,
} from 'felles/domene/kandidatliste/Kandidatliste';
import { mockMeg } from '../meg/mock';
import { mockKandidatIKandidatliste } from './mockKandidatIKandidatliste';

export const kandidatlisteUtenStilling: Kandidatliste = {
    kandidatlisteId: 'bf6877fa-5c82-4610-8cf7-ff7a0df18e29',
    tittel: 'Volleyballskuespiller på Pescara Beach',
    beskrivelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',

    kanEditere: true,
    kanSlette: KanSletteKandidatliste.KanSlettes,
    opprettetTidspunkt: new Date().toISOString(),
    status: Kandidatlistestatus.Åpen,

    stillingskategori: null,
    organisasjonNavn: null,
    organisasjonReferanse: null,
    stillingId: null,
    antallStillinger: null,

    kandidater: mockKandidatIKandidatliste,
    formidlingerAvUsynligKandidat: [],

    opprettetAv: {
        ident: mockMeg.navIdent,
        navn: 'Varg Veileder',
    },
};
