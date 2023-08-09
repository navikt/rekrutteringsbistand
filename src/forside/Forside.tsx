import { Loader } from '@navikt/ds-react';
import useNavKontor from 'felles/store/navKontor';
import css from './Forside.module.css';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import Statistikk from './statistikk/Statistikk';

const Forside = () => {
    const navKontor = useNavKontor((state) => state.navKontor);

    return (
        <div className={css.forsideWrapper}>
            <div className={css.forside}>
                <Hurtiglenker />
                {navKontor ? <Statistikk navKontor={navKontor} /> : <Loader />}
            </div>
        </div>
    );
};

export default Forside;
