import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

export const mockKandidatliste: Kandidatliste = {
    kandidatlisteId: '123',
    stillingId: 'abc',
    tittel: 'Volleyballskuespiller på Pescara Beach',
    organisasjonNavn: null,
    antallKandidater: 1,
    beskrivelse: null,
    organisasjonReferanse: null,

    opprettetTidspunkt: new Date().toISOString(),
    opprettetAv: {
        ident: 'AB123456',
        navn: 'Joare Mangstuen Mossby',
    },
};
