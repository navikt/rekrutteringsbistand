import css from './FormidlingssøkSidebar.module.css';
import Søkefelt from '../stilling/stillingssok/filter/søkefelt/Søkefelt';
import FylkerOgKommuner from '../stilling/stillingssok/filter/geografi/FylkerOgKommuner';

const FormidlingssøkSidebar = () => {
    return (
        <div className={css.filter}>
            <Søkefelt />

            <div className={css.filtercheckbokser}>
                <FylkerOgKommuner />
            </div>
        </div>
    );
};

export default FormidlingssøkSidebar;
