import css from './Filter.module.css';
import FilterCheckbokser from './om-annonsen/FilterCheckbokser';
import BrukStandardsøk from './standardsøk/BrukStandardsøk';
import Søkefelt from './søkefelt/Søkefelt';

type Props = {
    visStandardsøk: boolean;
};

const Filter = ({ visStandardsøk }: Props) => {
    return (
        <div className={css.filter}>
            <Søkefelt />
            {visStandardsøk && <BrukStandardsøk />}
            <FilterCheckbokser />
        </div>
    );
};

export default Filter;
