import { EsRespons } from '../../stilling/kontekst-av-kandidat/useKandidat';

const kandidatsøk: EsRespons = {
    hits: {
        hits: [
            {
                _source: {
                    etternavn: 'Klippfisk',
                    fornavn: 'Uklar',
                    arenaKandidatnr: 'AA100100',
                    fodselsdato: '1977-10-06T23:00:00.000+00:00',
                    adresselinje1: 'Langerudsvingen 18D',
                    postnummer: '1187',
                    poststed: 'Oslo',
                    epostadresse: 'mock111@Mock111.com',
                    telefon: '+47 40491880',
                    veileder: 'a100000',
                },
            },
        ],
    },
};

export default kandidatsøk;
