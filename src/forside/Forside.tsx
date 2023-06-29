import { Loader } from '@navikt/ds-react';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import css from './Forside.module.css';
import useNavKontor from '../felles/store/navKontor';

const Forside = () => {
    const navKontor = useNavKontor((state) => state.navKontor);

    return (
        <div className={css.forside}>
            <Hurtiglenker />
            {navKontor ? 'Statistikk for ' + navKontor : <Loader />}
        </div>
    );
};

export default Forside;
