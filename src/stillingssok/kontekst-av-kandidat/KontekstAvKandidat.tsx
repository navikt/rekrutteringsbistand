import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Nettstatus } from 'felles/nettressurs';
import useKandidatStillingssøk from './useKandidatStillingssøk';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const kandidat = useKandidatStillingssøk(kandidatnr);

    if (kandidat.kind === Nettstatus.Feil) {
        return null;
    } else {
        const brødsmulesti =
            kandidat.kind === Nettstatus.Suksess
                ? [
                      {
                          href: '/kandidatsok',
                          tekst: 'Kandidater',
                      },
                      {
                          href: `/kandidater/kandidat/${kandidat.data.arenaKandidatnr}/cv?fraKandidatsok=true`,
                          tekst: formaterNavn(kandidat.data),
                      },

                      {
                          tekst: 'Finn stilling',
                      },
                  ]
                : undefined;

        return <Kandidatbanner kandidat={kandidat} brødsmulesti={brødsmulesti} />;
    }
};

export default KontekstAvKandidat;
