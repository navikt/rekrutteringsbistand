import { Heading, Loader } from '@navikt/ds-react';
import * as React from 'react';
import css from './Formidlingssøk.module.css';
import { Stillingskategori } from '../felles/domene/stilling/Stilling';
import { filtrerOrdFraStilling } from '../felles/filterOrd';
import { formaterAntallAnnonser } from '../stilling/stillingssok/Stillingssøk';
import { GlobalAggregering } from '../stilling/stillingssok/domene/elasticSearchTyper';
import Filtermeny from '../stilling/stillingssok/filter/filtermeny/Filtermeny';
import Paginering from '../stilling/stillingssok/paginering/Paginering';
import Sorter from '../stilling/stillingssok/sorter/Sorter';
import Stillingsliste from '../stilling/stillingssok/stillingsliste/Stillingsliste';
import Søkefelter from '../stilling/stillingssok/søkefelter/Søkefelter';
import useAntallTreff from '../stilling/stillingssok/useAntallTreff';
import useSøkMedQuery from '../stilling/stillingssok/useSøkMedQuery';

export interface IAlleFormidlinger {
    navIdent?: string;
}

/* Hentet ut som konstant, så den alltid har samme identitet, siden
den brukes i dependency på en useEffect eller lignende.
 */
const kunFormidling = new Set([Stillingskategori.Formidling]);

const Formidlingssøk: React.FC<IAlleFormidlinger> = ({ navIdent }) => {
    const respons = useSøkMedQuery({
        navIdent,
        overstyrMedStillingskategori: kunFormidling,
    });

    const globalAggregering = respons?.aggregations
        ?.globalAggregering as unknown as GlobalAggregering;

    const filtrertResultat = filtrerOrdFraStilling(respons?.hits?.hits);

    const antallTreff = useAntallTreff(respons) - filtrertResultat.antallFiltrertBort;

    if (!respons) {
        return (
            <div className={css.spinner}>
                <Loader variant="interaction" size="2xlarge" />
            </div>
        );
    }
    return (
        <div style={{ marginTop: '1rem' }}>
            <Filtermeny finnerStillingForKandidat={false} skjulLagreStandardsøk />
            <div className={css.beskrivelseAvSøk}>
                <Heading level="2" size="medium">
                    {formaterAntallAnnonser(antallTreff)}
                </Heading>
                <Søkefelter aggregeringer={globalAggregering?.felter?.buckets} />
                <Sorter />
            </div>
            <Stillingsliste hits={filtrertResultat.hits} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paginering totaltAntallTreff={antallTreff} />
            </div>
        </div>
    );
};

export default Formidlingssøk;
