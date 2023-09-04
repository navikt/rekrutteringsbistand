import { Loader } from '@navikt/ds-react';
import useNavKontor from 'felles/store/navKontor';
import css from './Forside.module.css';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import Statistikk from './statistikk/Statistikk';

const Forside = () => {
    const { navKontor, navKontorNavn } = useNavKontor();

    return (
        <div className={css.forsideWrapper}>
            <div className={css.forside}>
                <Hurtiglenker />
                {navKontor ? (
                    <Statistikk navKontor={navKontor} navKontorNavn={navKontorNavn} />
                ) : (
                    <Loader data-testid="lastIndikator" />
                )}
            </div>
        </div>
    );
};

export default Forside;
