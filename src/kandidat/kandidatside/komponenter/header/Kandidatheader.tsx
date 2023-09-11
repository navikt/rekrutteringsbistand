import { Brødsmule } from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';
import { KandidatFraOpenSearch } from 'felles/domene/kandidat/Kandidat';

type Props = {
    kandidatnavigering: Kandidatnavigering | null;
    brødsmulesti: Brødsmule[];
    kandidat: Nettressurs<KandidatFraOpenSearch>;
};

const Kandidatheader = ({ kandidat, kandidatnavigering, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();

    const brødsmulestiMedNavn =
        kandidat.kind === Nettstatus.Suksess
            ? [
                  ...(brødsmulesti ?? []),
                  {
                      tekst: formaterNavn(kandidat.data),
                  },
              ]
            : brødsmulesti;
    return (
        <>
            <Kandidatbanner
                kandidat={kandidat}
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
