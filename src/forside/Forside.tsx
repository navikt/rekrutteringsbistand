import { Loader } from '@navikt/ds-react';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import css from './Forside.module.css';
import useNavKontor from 'felles/store/navKontor';
import Statistikk from './statistikk/Statistikk';

const Forside = () => {
    const navKontor = useNavKontor((state) => state.navKontor);

    return (
        <div className={css.forside}>
            <Hurtiglenker />
            {navKontor ? <Statistikk navKontor={navKontor} /> : <Loader />}
        </div>
    );
};

export default Forside;
