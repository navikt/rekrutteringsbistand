import { Nettressurs } from 'felles/nettressurs';
import { KandidatCv } from 'felles/domene/kandidat/EsKandidat';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import Kandidatbanner, {
    Brødsmule,
    formaterNavn,
} from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidatForBanner from 'felles/komponenter/banner/useKandidatForBanner';

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
            {feilmelding && (
                <nav className={css.navigasjon}>
                    <div className={css.column}>
                        TODO
                        {kandidatnavigering && (
                            <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                        )}
                    </div>
                </nav>
            )}
            {!feilmelding && (
                <Kandidatbanner
                    kandidat={kandidat}
                    brødsmulesti={brødsmulestiMedNavn}
                ></Kandidatbanner>
            )}
        </>
    );
};

export default Kandidatheader;
