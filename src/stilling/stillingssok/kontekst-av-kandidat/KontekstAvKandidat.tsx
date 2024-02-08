import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import {
    Kandidatsammendrag,
    useKandidatsammendrag,
} from '../../../api/kandidat-søk-api/kandidatsammendrag';
import ManglerØnsketSted from './ManglerØnsketSted';
import ManglerØnsketStedOgYrke from './ManglerØnsketStedOgYrke';
import ManglerØnsketYrke from './ManglerØnsketYrke';
import { useKandidatStillingssøkData } from './useKandidatStillingssøkData';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const { kandidatStillingssøk, hentetGeografiFraBosted, manglerØnsketYrke } =
        useKandidatStillingssøkData({ kandidatnr });

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

    const utledBannerelement = (kandidatsammendrag: Kandidatsammendrag) => {
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

    return kandidatsammendrag?.arenaKandidatnr ? (
        <Kandidatbanner
            kandidatnr={kandidatsammendrag.arenaKandidatnr}
            brødsmulesti={brødsmulesti}
            nederst={utledBannerelement(kandidatsammendrag)}
        />
    ) : (
        <> </>
    );
};

export default KontekstAvKandidat;
