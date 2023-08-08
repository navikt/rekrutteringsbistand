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
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { BodyLong } from '@navikt/ds-react';

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
            {feilmelding && brødsmulesti && brødsmulesti.length && (
                <nav className={css.navigasjon}>
                    <div className={css.column}>
                        <span>
                            <Link
                                className="navds-link"
                                to={brødsmulesti[brødsmulesti.length - 1].href}
                                state={brødsmulesti[brødsmulesti.length - 1].state}
                            >
                                <ChevronLeftIcon />
                                {brødsmulesti[brødsmulesti.length - 1].tekst}
                            </Link>
                            <BodyLong>Informasjonen om kandidaten kan ikke vises</BodyLong>
                        </span>
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
                    toppHoyre={
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
