import KandidatIKandidatliste, {
    Kandidatstatus,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { mockVeileder } from '../mockVeileder';
import { mockKandidat } from './mockKandidat';

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
        fodselsdato: mockKandidat.fodselsdato as string,
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
    {
        kandidatnr: 'PAM0xngui6g6',
        status: Kandidatstatus.Aktuell,
        lagtTilTidspunkt: '2024-03-19T07:51:15.741',
        lagtTilAv: {
            ident: 'Z994744',
            navn: 'F_Z994744 E_Z994744',
        },
        fornavn: 'Gul',
        etternavn: 'Knapp',
        fodselsdato: '1991-08-06',
        fodselsnr: '06889198689',
        utfall: Kandidatutfall.IkkePresentert,
        telefon: null,
        epost: null,
        innsatsgruppe: 'Standardinnsats',
        arkivert: false,
        arkivertTidspunkt: null,
        arkivertAv: null,
        aktørid: '2166363054666',
        utfallsendringer: [],
        erSynlig: false,
    },
];
