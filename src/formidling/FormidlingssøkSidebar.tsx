import FylkerOgKommuner from '../stilling/stillingssok/filter/geografi/FylkerOgKommuner';
import Annonsestatus from '../stilling/stillingssok/filter/om-annonsen/Annonsestatus';
import Søkefelt from '../stilling/stillingssok/filter/søkefelt/Søkefelt';
import css from './FormidlingssøkSidebar.module.css';

const FormidlingssøkSidebar = () => {
    return (
        <div className={css.filter}>
            <Søkefelt />

            <div className={css.filtercheckbokser}>
                <Annonsestatus />
                <FylkerOgKommuner />
            </div>
        </div>
    );
};

export default FormidlingssøkSidebar;
