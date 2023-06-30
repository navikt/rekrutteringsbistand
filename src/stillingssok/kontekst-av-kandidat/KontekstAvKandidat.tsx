import useKandidat from './useKandidat';
import Kandidatbanner from '../../felles/banner/kandidatbanner/Kandidatbanner';

type Props = {
    fnr: string;
};

const KontekstAvKandidat = ({ fnr }: Props) => {
    const { kandidat } = useKandidat(fnr);

    return (
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
