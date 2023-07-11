import { FunctionComponent } from 'react';
import Annonsestatus from './Annonsestatus';
import HvorErAnnonsenPublisert from './HvorErAnnonsenPublisert';
import VelgStillingskategori from './VelgStillingskategori';
import css from './FilterCheckbokser.module.css';
import FylkerOgKommuner from '../geografi/FylkerOgKommuner';
import Inkludering from '../inkludering/Inkludering';

const FilterCheckbokser: FunctionComponent = () => {
    return (
        <div className={css.filtercheckbokser}>
            <Annonsestatus />
            <FylkerOgKommuner />
            <Inkludering />
            <VelgStillingskategori />
            <HvorErAnnonsenPublisert />
        </div>
    );
};

export default FilterCheckbokser;
