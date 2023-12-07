import KandidatIKandidatliste, {
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, {
    KandidatlisteForKandidat,
    Kandidatlistestatus,
    KanSletteKandidatliste,
    OpprettetAv,
} from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { mockMeg } from '../meg/mock';
import { mockStilling } from '../stilling-api/mockStilling';
import { mockKandidatIKandidatliste } from './mockKandidatIKandidatliste';

const enAnnenVeileder: OpprettetAv = {
    ident: 'Z999999',
    navn: 'Vilde Veileder',
};

export const mockKandidatlisteUtenStilling: Kandidatliste = {
    kandidatlisteId: 'bf6877fa-5c82-4610-8cf7-ff7a0df18e29',
    tittel: 'Volleyballskuespiller på Pescara Beach',

    erEier: false,
    kanEditere: false,
    kanSlette: KanSletteKandidatliste.KanSlettes,
    opprettetTidspunkt: new Date().toISOString(),
    status: Kandidatlistestatus.Åpen,

    stillingskategori: null,
    organisasjonNavn: null,
    organisasjonReferanse: null,
    stillingId: null,
    antallStillinger: null,

    kandidater: mockKandidatIKandidatliste,
    formidlingerAvUsynligKandidat: [
        {
            fornavn: 'Fornavn',
            mellomnavn: 'Mellomnavn',
            etternavn: 'Etternavn',
            id: '12345678910',
            utfall: Kandidatutfall.FåttJobben,
            lagtTilTidspunkt: new Date().toISOString(),
            lagtTilAvIdent: 'Z999999',
            lagtTilAvNavn: 'Veileder Navn',
            arkivert: true,
            arkivertTidspunkt: new Date().toISOString(),
            arkivertAvIdent: 'Z999998',
            arkivertAvNavn: 'Arkivist Navn',
        },
    ],

    opprettetAv: enAnnenVeileder,
};

export const mockKandidatlisteMedStilling: Kandidatliste = {
    kandidatlisteId: 'e793b0e0-14e6-450b-a0cb-ef7e50ba2385',
    tittel: 'Er du en bedreviter?',

    erEier: true,
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

export const opprettMockKandidatlisteForKandidat = (
    kandidatliste: Kandidatliste,
    kandidat: KandidatIKandidatliste
): KandidatlisteForKandidat => ({
    uuid: kandidatliste.kandidatlisteId,
    tittel: kandidatliste.tittel,
    organisasjonReferanse: kandidatliste.organisasjonReferanse,
    organisasjonNavn: kandidatliste.organisasjonNavn,
    stillingId: kandidatliste.stillingId,
    antallStillinger: kandidatliste.antallStillinger,
    status: kandidat.status,
    utfall: kandidat.utfall,

    kandidatnr: kandidat.kandidatnr,
    fornavn: kandidat.fornavn,
    etternavn: kandidat.etternavn,
    lagtTilTidspunkt: kandidat.lagtTilTidspunkt,
    lagtTilAvIdent: kandidat.lagtTilAv.ident,
    lagtTilAvEpost: 'epost',
    lagtTilAvNavn: kandidat.lagtTilAv.navn,
    utfallsendringer: kandidat.utfallsendringer,
    slettet: kandidat.arkivert,
    stillingskategori: kandidatliste.stillingskategori,
    opprettetAvIdent: kandidatliste.opprettetAv.ident,
    erMaskert: true,
});

export const mockAlleKandidatlister = [mockKandidatlisteMedStilling, mockKandidatlisteUtenStilling];
