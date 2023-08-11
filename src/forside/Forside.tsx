import { Loader } from '@navikt/ds-react';
import useNavKontor from 'felles/store/navKontor';
import css from './Forside.module.css';
import Hurtiglenker from './hurtiglenker/Hurtiglenker';
import Statistikk from './statistikk/Statistikk';

const Forside = () => {
    const navKontor = useNavKontor((state) => state.navKontor);

    return (
        <div className={css.forside}>
            <Hurtiglenker />
            <button
                onClick={() => {
                    throw new Error('Dette er en DEV-feil');
                }}
            >
                Hei feil
            </button>
            {navKontor ? <Statistikk navKontor={navKontor} /> : <Loader />}
        </div>
    );
};

export default Forside;
