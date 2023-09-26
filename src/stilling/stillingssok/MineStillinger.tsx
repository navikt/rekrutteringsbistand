import { Heading, Loader } from '@navikt/ds-react';
import * as React from 'react';
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

export interface IMineStillinger {
    navIdent: string;
    kandidatnr: string;
    finnerStillingForKandidat?: boolean;
}

const MineStillinger: React.FC<IMineStillinger> = ({
    navIdent,
    kandidatnr,
    finnerStillingForKandidat,
}) => {
    const respons = useSøkMedQuery({ navIdent, ikkePubliserte: true });

    const globalAggregering = respons?.aggregations
        ?.globalAggregering as unknown as GlobalAggregering;

    const antallTreff = useAntallTreff(respons);

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
            <Stillingsliste esResponse={respons} kandidatnr={kandidatnr} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paginering totaltAntallTreff={antallTreff} />
            </div>
        </div>
    );
};

export default MineStillinger;
