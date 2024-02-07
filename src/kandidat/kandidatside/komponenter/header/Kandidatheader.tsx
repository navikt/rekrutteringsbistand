import { Brødsmule } from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidatsammendrag from 'felles/komponenter/kandidatbanner/useKandidatsammendrag';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';

type Props = {
    kandidatnr: string;
    kandidatnavigering: Kandidatnavigering | null;
    brødsmulesti: Brødsmule[];
};

const Kandidatheader = ({ kandidatnavigering, kandidatnr, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();

    const { kandidatsammendrag, error, isLoading } = useKandidatsammendrag({ kandidatnr });

    if (isLoading) {
        return <></>;
    }

    const brødsmulestiMedNavn = kandidatsammendrag
        ? [
              ...(brødsmulesti ?? []),
              {
                  tekst: formaterNavn(kandidatsammendrag),
              },
          ]
        : brødsmulesti;
    return (
        <>
            {kandidatsammendrag && kandidatsammendrag?.arenaKandidatnr && (
                <Kandidatbanner
                    kandidatnr={kandidatsammendrag.arenaKandidatnr}
                    brødsmulesti={brødsmulestiMedNavn}
                    øverstTilHøyre={
                        kandidatnavigering && (
                            <div className={css.forrigeNeste}>
                                <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                            </div>
                        )
                    }
                ></Kandidatbanner>
            )}
        </>
    );
};

export default Kandidatheader;
