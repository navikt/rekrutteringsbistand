import { BodyLong, SortState, Table } from '@navikt/ds-react';
import classNames from 'classnames';
import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import {
    Retning,
    nesteSorteringsretning,
} from '../../kandidatliste/liste-header/sorterbarKolonneheader/Retning';
import AppState from '../../state/AppState';
import { KandidatlisteSorteringsfelt } from '../Kandidatlistesortering';
import { ListeoversiktActionType } from '../reducer/ListeoversiktAction';
import css from './Kandidatlistetabell.module.css';

type Props = {
    nettstatus: Nettstatus;
    kandidatlister: KandidatlisteSammendrag[];
    className?: string;
    children: ReactNode;
};

const Kandidatlistetabell = ({ nettstatus, kandidatlister, className, children }: Props) => {
    const dispatch = useDispatch();

    const aktivtSorteringsfelt = useSelector(
        (state: AppState) => state.listeoversikt.sortering.sortField
    );

    const aktivRetning = useSelector(
        (state: AppState) => state.listeoversikt.sortering.sortDirection
    );

    const onSortChange = (sorteringsfelt: KandidatlisteSorteringsfelt) => {
        const sorteringPåNyttFelt = aktivtSorteringsfelt !== sorteringsfelt;
        const nyRetning = sorteringPåNyttFelt
            ? Retning.Stigende
            : nesteSorteringsretning(aktivRetning);

        const nyttFelt = nyRetning === null ? null : sorteringsfelt;

        dispatch({
            type: ListeoversiktActionType.SetSortering,
            sortering: { sortField: nyttFelt, sortDirection: nyRetning },
        });
    };

    const sort = aktivtSorteringsfelt
        ? {
              orderBy: aktivtSorteringsfelt,
              direction: aktivRetning === Retning.Stigende ? 'ascending' : 'descending',
          }
        : undefined;

    if (nettstatus !== Nettstatus.Suksess) {
        return <Sidelaster className={className} />;
    } else if (kandidatlister.length === 0) {
        return (
            <div className={classNames(className, css.fantIngenKandidater)}>
                <BodyLong size="medium">Fant ingen kandidatlister som matcher søket ditt.</BodyLong>
            </div>
        );
    }

    return (
        <Table
            zebraStripes
            size="medium"
            sort={sort as SortState}
            onSortChange={onSortChange}
            className={classNames(css.tabell, className)}
        >
            {children}
        </Table>
    );
};

export default Kandidatlistetabell;
