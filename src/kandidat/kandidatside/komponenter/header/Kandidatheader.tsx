import { Brødsmule } from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidat from 'felles/komponenter/kandidatbanner/useKandidat';
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

    const { kandidatsammendrag, error, isLoading } = useKandidat(kandidatnr);
    /*if (isLoading) {
        return <>testloader</>;
    }

    if (error) {
        <>Klarte ikke å hente kandidaten</>;
    }*/

    const brødsmulestiMedNavn = error
        ? brødsmulesti
        : [
              ...(brødsmulesti ?? []),
              {
                  tekst: formaterNavn(kandidatsammendrag.data),
              },
          ];
    return (
        <>
            <Kandidatbanner
                kandidat={kandidatsammendrag}
                brødsmulesti={brødsmulestiMedNavn}
                øverstTilHøyre={
                    kandidatnavigering && (
                        <div className={css.forrigeNeste}>
                            <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                        </div>
                    )
                }
            ></Kandidatbanner>
        </>
    );
};

export default Kandidatheader;
