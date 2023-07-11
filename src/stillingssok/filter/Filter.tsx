import BrukStandardsøk from './standardsøk/BrukStandardsøk';
import Søkefelt from './søkefelt/Søkefelt';
import css from './Filter.module.css';
import FilterCheckbokser from './om-annonsen/FilterCheckbokser';

type Props = {
    fnr?: string;
};

const Filter = ({ fnr }: Props) => {
    return (
        <div className={css.filter}>
            <Søkefelt />
            {fnr === undefined && <BrukStandardsøk />}
            <FilterCheckbokser />
        </div>
    );
};

export default Filter;
