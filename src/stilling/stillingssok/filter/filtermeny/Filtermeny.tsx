import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { QueryParam } from '../../utils/urlUtils';
import LagreStandardsøk from '../standardsøk/LagreStandardsøk';
import ValgteKrierier from '../valgte-kriterier/ValgteKriterier';
import css from './Filtermeny.module.css';

type Props = {
    finnerStillingForKandidat?: boolean;
    skjulLagreStandardsøk?: boolean;
};

const Filtermeny = ({ finnerStillingForKandidat, skjulLagreStandardsøk }: Props) => {
    const [searchParams] = useSearchParams();

    const keys = Array.from(searchParams.keys());
    const harIngenFiltre = keys.length === 0;

    const ignorerteFiltre = hentIgnorerteFiltre(finnerStillingForKandidat);
    const ingenFiltreSkalTømmes = Array.from(searchParams.keys()).every((param) =>
        ignorerteFiltre.includes(param as QueryParam)
    );

    if (harIngenFiltre || ingenFiltreSkalTømmes) {
        return <div className={css.wrapper} />;
    }

    return (
        <div className={classNames(css.wrapper, css.filtermeny)}>
            <ValgteKrierier finnerStillingForKandidat={finnerStillingForKandidat} />
            {finnerStillingForKandidat || skjulLagreStandardsøk ? null : <LagreStandardsøk />}
        </div>
    );
};

export const hentIgnorerteFiltre = (finnerStillingForKandidat: boolean | undefined) => {
    const ignorerteFiltre = [QueryParam.Sortering, QueryParam.Modal, QueryParam.Portofølje];

    if (finnerStillingForKandidat) {
        ignorerteFiltre.push(QueryParam.Statuser);
    }

    return ignorerteFiltre;
};

export default Filtermeny;
