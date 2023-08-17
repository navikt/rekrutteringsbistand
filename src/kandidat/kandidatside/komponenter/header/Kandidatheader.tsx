import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import { Brødsmule } from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidat, { kandidatnrTerm } from 'felles/komponenter/kandidatbanner/useKandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';

type Props = {
    cv: Nettressurs<KandidatCv>;
    kandidatnr: string;
    kandidatnavigering: Kandidatnavigering | null;
    brødsmulesti: Brødsmule[];
};

const Kandidatheader = ({ kandidatnavigering, kandidatnr, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();

    const kandidat = useKandidat(kandidatnrTerm(kandidatnr));

    const brødsmulestiMedNavn =
        kandidat.kind === Nettstatus.Suksess
            ? [
                  ...brødsmulesti,
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
