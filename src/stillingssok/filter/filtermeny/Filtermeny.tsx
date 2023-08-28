import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { QueryParam } from '../../utils/urlUtils';
import LagreStandardsøk from '../standardsøk/LagreStandardsøk';
import ValgteKrierier from '../valgte-kriterier/ValgteKriterier';
import css from './Filtermeny.module.css';

type Props = {
    visStandardsøk: boolean;
    visStatusfilter: boolean;
};

const Filtermeny = ({ visStandardsøk }: Props) => {
    const [searchParams] = useSearchParams();

    const keys = Array.from(searchParams.keys());
    const harIngenFiltre = keys.length === 0;
    const harKunSortering = keys.length === 1 && searchParams.has(QueryParam.Sortering);

    if (harIngenFiltre || harKunSortering) {
        return <div className={css.wrapper} />;
    }

    return (
        <div className={classNames(css.wrapper, css.filtermeny)}>
            <ValgteKrierier visStatusfilter={visStatusfilter} />
            {visStandardsøk && <LagreStandardsøk />}
        </div>
    );
};

export default Filtermeny;
