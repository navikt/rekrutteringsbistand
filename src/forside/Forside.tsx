import { Loader } from '@navikt/ds-react';
import useNavKontor from 'felles/store/navKontor';
import ErrorBoundary from '../felles/feilhåndtering/ErrorBoundary';
import css from './Forside.module.css';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import Statistikk from './statistikk/Statistikk';

const Forside = () => {
    const { navKontor, navKontorNavn } = useNavKontor();

    return (
        <div className={css.forsideWrapper}>
            <ErrorBoundary>
                <div className={css.forside}>
                    <Hurtiglenker />
                    {navKontor ? (
                        <Statistikk navKontor={navKontor} navKontorNavn={navKontorNavn} />
                    ) : (
                        <Loader data-testid="lastIndikator" />
                    )}
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default Forside;
