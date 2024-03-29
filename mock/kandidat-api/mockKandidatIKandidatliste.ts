import KandidatIKandidatliste, {
    Kandidatstatus,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { mockKandidat } from './mockKandidat';
import { mockVeileder } from '../mockVeileder';

export const mockKandidatIKandidatliste: KandidatIKandidatliste[] = [
    {
        kandidatnr: mockKandidat.kandidatnr,
        aktørid: mockKandidat.aktorId,
        arkivert: false,
        arkivertAv: null,
        arkivertTidspunkt: null,
        epost: mockKandidat.epostadresse,
        erSynlig: true,
        etternavn: mockKandidat.etternavn,
        fodselsdato: mockKandidat.fodselsdato!!,
        fodselsnr: mockKandidat.fodselsnummer,
        fornavn: mockKandidat.fornavn,
        innsatsgruppe: 'Situasjonsbestemt innsats',
        lagtTilAv: {
            ident: mockVeileder.navIdent,
            navn: 'Varg Veileder',
        },
        lagtTilTidspunkt: new Date().toISOString(),
        status: Kandidatstatus.Vurderes,
        telefon: mockKandidat.telefon,
        utfall: Kandidatutfall.IkkePresentert,
        utfallsendringer: [],
    },
];
