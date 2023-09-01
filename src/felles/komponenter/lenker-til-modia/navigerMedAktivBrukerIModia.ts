import { api, post } from 'felles/api';
import { Nettstatus } from 'felles/nettressurs';

const navigerMedAktivBrukerIModia = async (href: string, fødselsnummer: string) => {
    const response = await post(`${api.modiaContextHolder}/context`, {
        verdi: fødselsnummer,
        eventType: 'NY_AKTIV_BRUKER',
    });

    if (response.kind === Nettstatus.Feil) {
        throw new Error(
            'Klarte ikke å sette fnr-kontekst i modiacontextholder: ' + response.error.message
        );
    }

    window.open(href, '_blank');
};

export default navigerMedAktivBrukerIModia;
