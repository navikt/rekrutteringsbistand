import { Pagination } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { PAGE_SIZE } from '../api/query/byggQuery';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier from '../hooks/useSøkekriterier';
import css from './Paginering.module.css';

type Props = {
    antallTreff: number;
};

const Paginering: FunctionComponent<Props> = ({ antallTreff }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const antallSider = Math.ceil(antallTreff / PAGE_SIZE);

    const setSidetall = (page: number) => {
        console.log('nySide:', page);
        setSearchParam(FilterParam.Side, page > 1 ? String(page) : null);
        scrollTilToppen();
    };

    if (antallSider < 2) {
        return null;
    } else {
        return (
            <Pagination
                size="medium"
                className={css.wrapper}
                page={søkekriterier.side}
                onPageChange={setSidetall}
                count={antallSider}
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
