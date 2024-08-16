import { Heading, Loader } from '@navikt/ds-react';
import { filtrerOrdFraStilling } from '../../felles/filterOrd';
import { fallbackIngenValgteStillingskategorierSet } from './AlleStillinger';
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

export type Props = {
    navIdent: string;
    kandidatnr?: string;
    finnerStillingForKandidat?: boolean;
};

const MineStillinger = ({ navIdent, kandidatnr, finnerStillingForKandidat }: Props) => {
    const respons = useSøkMedQuery({
        navIdent,
        ikkePubliserte: true,
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

export default MineStillinger;
