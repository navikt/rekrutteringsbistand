import { Nettressurs } from 'felles/nettressurs';
import { KandidatCv } from 'felles/domene/kandidat/EsKandidat';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidatForBanner from 'felles/komponenter/banner/useKandidatForBanner';
import { Brødsmule } from 'felles/komponenter/kandidatbanner/BrødsmuleKomponent';

type Props = {
    cv: Nettressurs<KandidatCv>;
    kandidatnr: string;
    kandidatnavigering: Kandidatnavigering | null;
    brødsmulesti?: Brødsmule[];
};

const Kandidatheader = ({ kandidatnavigering, kandidatnr, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();
    const { kandidat, feilmelding } = useKandidatForBanner(kandidatnr);

    const brødsmulestiMedNavn = kandidat && [
        ...brødsmulesti,
        {
            tekst: formaterNavn(kandidat),
        },
    ];
    return (
        <>
            <Kandidatbanner
                kandidat={kandidat}
                brødsmulesti={brødsmulestiMedNavn}
                toppHoyre={
                    kandidatnavigering && (
                        <div className={css.forrigeNeste}>
                            <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                        </div>
                    )
                }
                feil={feilmelding !== undefined}
            ></Kandidatbanner>
        </>
    );
};

export default Kandidatheader;
