import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import { Brødsmule } from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import Kandidatbanner, {
    Veileder,
    formaterNavn,
} from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidat from 'felles/komponenter/kandidatbanner/useKandidat';
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

const Kandidatheader = ({ cv, kandidatnavigering, kandidatnr, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();

    const kandidat = useKandidat(kandidatnr);

    const brødsmulestiMedNavn =
        kandidat.kind === Nettstatus.Suksess
            ? [
                  ...(brødsmulesti ?? []),
                  {
                      tekst: formaterNavn(kandidat.data),
                  },
              ]
            : brødsmulesti;

    const kandidatensVeileder: Veileder =
        cv.kind === Nettstatus.Suksess && kandidat.kind === Nettstatus.Suksess
            ? {
                  navn: cv.data.veilederNavn,
                  epost: cv.data.veilederEpost,
                  ident: kandidat.data.veileder,
              }
            : undefined;

    return (
        <>
            <Kandidatbanner
                kandidat={kandidat}
                veileder={kandidatensVeileder}
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
