import { Pagination } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import { KandidatSøkContext } from '../KandidatSøkContext';
import { FilterParam } from '../hooks/useQuery';
import css from './Paginering.module.css';

type Props = {
    antallTreff: number;
};

export const PAGE_SIZE = 25;

const Paginering: FunctionComponent<Props> = ({ antallTreff }) => {
    const { kriterier } = useContext(KandidatSøkContext);
    const antallSider = Math.ceil(antallTreff / PAGE_SIZE);

    const setSidetall = (nySide: number) => {
        kriterier.setSøkeparameter(FilterParam.Side, nySide > 1 ? String(nySide) : null);
        scrollTilToppen();
    };

    if (antallSider < 2) {
        return null;
    } else {
        // Elasticsearch takler ikke mer enn 10000 element i pagineringen uten å endre max result i es, som kan ha konsekvenser for minne og ytelse.
        // I tillegg så må vi trekke fra 10 elementer på grunn av next og previous blading i kandidater.
        const siderTilPaginering = antallSider > 390 ? 390 : antallSider;

        return (
            <Pagination
                size="medium"
                className={css.wrapper}
                page={kriterier.søkekriterier.side}
                onPageChange={setSidetall}
                count={siderTilPaginering}
            />
        );
    }
};

const scrollTilToppen = () => {
    window.scrollTo({
        top: 0,
    });
};

export default Paginering;
