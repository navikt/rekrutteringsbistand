import { Loader } from '@navikt/ds-react';
import { useContext } from 'react';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import ErrorBoundary from '../felles/feilhåndtering/ErrorBoundary';
import css from './Forside.module.css';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import Statistikk from './statistikk/Statistikk';

const Forside = () => {
    const { valgtNavKontor } = useContext(ApplikasjonContext);

    return (
        <div className={css.forsideWrapper}>
            <ErrorBoundary>
                <div className={css.forside}>
                    <Hurtiglenker />
                    {valgtNavKontor ? (
                        <Statistikk
                            navKontor={valgtNavKontor.navKontor}
                            navKontorNavn={valgtNavKontor.navKontorNavn}
                        />
                    ) : (
                        <Loader data-testid="lastIndikator" />
                    )}
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default Forside;
