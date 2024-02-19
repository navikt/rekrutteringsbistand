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
import { mockVeileder } from '../mockVeileder';
import { mockStilling } from '../stilling-api/mockStilling';
import { mockKandidatIKandidatliste } from './mockKandidatIKandidatliste';

const enAnnenVeileder: OpprettetAv = {
    ident: 'Z999999',
    navn: 'Vilde Veileder',
};

export const mockKandidatlisteMedStilling: Kandidatliste = {
    kandidatlisteId: 'abc-test-med-stilling',
    tittel: 'Er du en bedreviter?',

    erEier: false,
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

    opprettetAv: enAnnenVeileder,
};

export const mockMinKandidatlisteMedStilling: Kandidatliste = {
    kandidatlisteId: 'abc-test-med-stilling',
    tittel: 'Min Kandidatliste med stilling',

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
        ident: mockVeileder.navIdent,
        navn: 'Varg Veileder',
    },
};

export const opprettMockKandidatlisteForKandidat = (
    kandidatliste: Kandidatliste,
    kandidat: KandidatIKandidatliste
): KandidatlisteForKandidat => ({
    uuid: kandidatliste.kandidatlisteId,
    tittel: kandidatliste.tittel,
    organisasjonReferanse: kandidatliste.organisasjonReferanse ?? undefined,
    organisasjonNavn: kandidatliste.organisasjonNavn ?? undefined,
    stillingId: kandidatliste.stillingId ?? undefined,
    antallStillinger: kandidatliste.antallStillinger ?? undefined,
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

export const mockAlleKandidatlister = [
    mockKandidatlisteMedStilling,
    mockMinKandidatlisteMedStilling,
];
