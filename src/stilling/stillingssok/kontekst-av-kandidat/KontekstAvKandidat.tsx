import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import ManglerØnsketSted from './ManglerØnsketSted';
import ManglerØnsketStedOgYrke from './ManglerØnsketStedOgYrke';
import ManglerØnsketYrke from './ManglerØnsketYrke';
import useKandidatStillingssøk from './useKandidatStillingssøk';
import useKandidatsammendrag from 'felles/komponenter/kandidatbanner/useKandidatsammendrag';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const { kandidatStillingssøk, hentetGeografiFraBosted, manglerØnsketYrke } =
        useKandidatStillingssøk({ kandidatnr });

    const { kandidatsammendrag } = useKandidatsammendrag({ kandidatnr });

    const brødsmulesti = kandidatsammendrag
        ? [
              {
                  href: '/kandidatsok',
                  tekst: 'Kandidater',
              },
              {
                  href: `/kandidater/kandidat/${kandidatsammendrag?.arenaKandidatnr}/cv?fraKandidatsok=true`,
                  tekst: formaterNavn(kandidatsammendrag),
              },

              {
                  tekst: 'Finn stilling',
              },
          ]
        : [];

    const utledBannerelement = () => {
        if (kandidatStillingssøk) {
            if (manglerØnsketYrke && hentetGeografiFraBosted) {
                return <ManglerØnsketStedOgYrke fnr={kandidatsammendrag.fodselsnummer} />;
            } else if (manglerØnsketYrke) {
                return <ManglerØnsketYrke fnr={kandidatsammendrag.fodselsnummer} />;
            } else if (hentetGeografiFraBosted) {
                return <ManglerØnsketSted fnr={kandidatsammendrag.fodselsnummer} />;
            }
        }
    };

    return (
        kandidatsammendrag?.arenaKandidatnr && (
            <Kandidatbanner
                kandidatnr={kandidatsammendrag.arenaKandidatnr}
                brødsmulesti={brødsmulesti}
                nederst={utledBannerelement()}
            />
        )
    );
};

export default KontekstAvKandidat;
