import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Nettressurs } from 'felles/nettressurs';
import { KandidatCv } from 'felles/domene/kandidat/EsKandidat';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import Kandidatbanner, { Brødsmule } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidatForBanner from 'felles/komponenter/banner/useKandidatForBanner';

type Props = {
    cv: Nettressurs<KandidatCv>;
    kandidatnr: string;
    kandidatnavigering: Kandidatnavigering | null;
    tilbakelenkeTekst: string;
    tilbakelenke: {
        to: string;
        state?: object;
    };
    brødsmulesti?: Brødsmule[];
};

const Kandidatheader = ({
    tilbakelenke,
    tilbakelenkeTekst,
    kandidatnavigering,
    kandidatnr,
    brødsmulesti,
}: Props) => {
    useMaskerFødselsnumre();
    const { kandidat, feilmelding } = useKandidatForBanner(kandidatnr);
    return (
        <>
            {feilmelding && (
                <nav className={css.navigasjon}>
                    <div className={css.column}>
                        <Link className="navds-link" {...tilbakelenke}>
                            <ChevronLeftIcon />
                            {tilbakelenkeTekst}
                        </Link>
                        {kandidatnavigering && (
                            <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                        )}
                    </div>
                </nav>
            )}
            {!feilmelding && (
                <Kandidatbanner kandidat={kandidat} brødsmulesti={brødsmulesti}></Kandidatbanner>
            )}
        </>
    );
};

export default Kandidatheader;
