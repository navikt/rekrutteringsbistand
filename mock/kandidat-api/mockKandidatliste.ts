import Kandidatliste, {
    KanSletteKandidatliste,
    Kandidatlistestatus,
} from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { mockMeg } from '../meg/mock';
import { mockStilling } from '../stilling-api/mockStilling';
import { mockKandidatIKandidatliste } from './mockKandidatIKandidatliste';

export const mockKandidatlisteUtenStilling: Kandidatliste = {
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

export const mockKandidatlisteMedStilling: Kandidatliste = {
    kandidatlisteId: 'e793b0e0-14e6-450b-a0cb-ef7e50ba2385',
    tittel: 'Er du en bedreviter?',
    beskrivelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',

    kanEditere: true,
    kanSlette: KanSletteKandidatliste.KanSlettes,
    opprettetTidspunkt: new Date().toISOString(),
    status: Kandidatlistestatus.Åpen,

    stillingId: mockStilling.uuid,
    stillingskategori: Stillingskategori.Stilling,
    antallStillinger: Number(mockStilling.properties.positioncount),
    organisasjonReferanse: mockStilling.employer.orgnr,
    organisasjonNavn: mockStilling.employer.publicName,

    formidlingerAvUsynligKandidat: [],
    kandidater: mockKandidatIKandidatliste,

    opprettetAv: {
        ident: mockMeg.navIdent,
        navn: 'Varg Veileder',
    },
};

export const mockAlleKandidatlister = [mockKandidatlisteMedStilling, mockKandidatlisteUtenStilling];
