import useKandidat from './useKandidat';
import Kandidatbanner from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Alert } from '@navikt/ds-react';

type Props = {
    fnr: string;
};

const KontekstAvKandidat = ({ fnr }: Props) => {
    const { kandidat, feilmelding } = useKandidat(fnr);

    console.log('KontekstAvKandidat', kandidat);
    return feilmelding ? (
        <Alert variant="error">Kandidaten er ikke synlig i Rekrutteringsbistand</Alert>
    ) : (
        <Kandidatbanner
            kandidat={kandidat}
            brødsmulesti={
                kandidat
                    ? [
                          {
                              href: '/kandidatsok',
                              tekst: 'Kandidater',
                          },
                          {
                              href: `/kandidater/kandidat/${kandidat.arenaKandidatnr}/cv?fraKandidatsok=true`,
                              tekst: `${kandidat.fornavn} ${kandidat.etternavn}`,
                          },

                          {
                              tekst: 'Finn stilling',
                          },
                      ]
                    : undefined
            }
        />
    );
};

export default KontekstAvKandidat;
