import { Heading, Loader } from '@navikt/ds-react';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { filtrerOrdFraStilling } from '../../felles/filterOrd';
import { formaterAntallAnnonser } from './Stillingssøk';
import css from './Stillingssøk.module.css';
import { GlobalAggregering } from './domene/elasticSearchTyper';
import Filtermeny from './filter/filtermeny/Filtermeny';
import Paginering from './paginering/Paginering';
import Sorter from './sorter/Sorter';
import Stillingsliste from './stillingsliste/Stillingsliste';
import Søkefelter from './søkefelter/Søkefelter';
import useAntallTreff from './useAntallTreff';
import useSøkMedQuery from './useSøkMedQuery';
import { ApplikasjonContext } from '../../felles/ApplikasjonContext';
import { useContext } from 'react';

export type Props = {
    kandidatnr?: string;
    finnerStillingForKandidat?: boolean;
};

export const fallbackIngenValgteStillingskategorierSet = new Set([
    Stillingskategori.Stilling,
    Stillingskategori.Jobbmesse,
]);

const AlleStillinger = ({ kandidatnr, finnerStillingForKandidat }: Props) => {
    const { roller } = useContext(ApplikasjonContext);

    const respons = useSøkMedQuery({
        harRolle: roller,
        fallbackIngenValgteStillingskategorier: fallbackIngenValgteStillingskategorierSet,
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
            <Filtermeny finnerStillingForKandidat={finnerStillingForKandidat} />
            <div className={css.beskrivelseAvSøk}>
                <Heading level="2" size="medium" className={css.antallStillinger}>
                    {formaterAntallAnnonser(antallTreff)}
                </Heading>
                <Søkefelter aggregeringer={globalAggregering?.felter?.buckets} />
                <Sorter />
            </div>
            <Stillingsliste hits={filtrertResultat.hits} kandidatnr={kandidatnr} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paginering totaltAntallTreff={antallTreff} />
            </div>
        </div>
    );
};

export default AlleStillinger;
