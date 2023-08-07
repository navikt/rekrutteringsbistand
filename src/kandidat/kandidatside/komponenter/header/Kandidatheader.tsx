import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Nettressurs } from 'felles/nettressurs';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import Kandidatbanner from 'felles/komponenter/kandidatbanner/Kandidatbanner';
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
};

const Kandidatheader = ({
    tilbakelenke,
    tilbakelenkeTekst,
    kandidatnavigering,
    kandidatnr,
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
            {!feilmelding && <Kandidatbanner kandidat={kandidat}></Kandidatbanner>}
        </>
    );
};

export default Kandidatheader;
