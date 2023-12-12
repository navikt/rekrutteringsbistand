import { Heading, Loader } from '@navikt/ds-react';
import * as React from 'react';
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
    children?: React.ReactNode | undefined;
}

const AlleFormidlinger: React.FC<IAlleFormidlinger> = ({ children }) => {
    const respons = useSøkMedQuery({
        overstyrMedStillingskategori: new Set([Stillingskategori.Formidling]),
    });

    const globalAggregering = respons?.aggregations
        ?.globalAggregering as unknown as GlobalAggregering;

    const filtrertResultat = filtrerOrdFraStilling(respons?.hits?.hits);

    const antallTreff = useAntallTreff(respons) - filtrertResultat.antallFiltrertBort;

    if (!respons) {
        return (
            // <div className={css.spinner}>
            <div>
                <Loader variant="interaction" size="2xlarge" />
            </div>
        );
    }
    return (
        <div style={{ marginTop: '1rem' }}>
            <Filtermeny finnerStillingForKandidat={false} />
            {/* <div className={css.beskrivelseAvSøk}> */}
            <div>
                {/* <Heading level="2" size="medium" className={css.antallStillinger}> */}
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

export default AlleFormidlinger;
