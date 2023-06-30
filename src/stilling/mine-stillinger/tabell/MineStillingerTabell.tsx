import { FunctionComponent } from 'react';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Ingress, SortState, Table } from '@navikt/ds-react';
import { MineStillingerResultat } from '../mineStillingerReducer';
import { nesteSorteringsretning, Retning } from './Retning';
import { MineStillingerActionType } from '../MineStillingerAction';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { MineStillingerSorteringsfelt } from '../MineStillingerSortering';
import classNames from 'classnames';
import TabellHeader from './TabellHeader';
import TabellBody from './TabellBody';
import css from './MineStillingerTabell.module.css';
import Sidelaster from '../../common/sidelaster/Sidelaster';

type Props = {
    resultat: Nettressurs<MineStillingerResultat>;
    className?: string;
};

const MineStillingerTabell: FunctionComponent<Props> = ({ resultat, className }) => {
    const dispatch = useDispatch();

    const aktivtSorteringsfelt = useSelector((state: State) => state.mineStillinger.sortField);

    const aktivRetning = useSelector((state: State) => state.mineStillinger.sortDir);

    const onSortChange = (sorteringsfelt: MineStillingerSorteringsfelt) => {
        const sorteringPåNyttFelt = aktivtSorteringsfelt !== sorteringsfelt;
        const nyRetning = sorteringPåNyttFelt
            ? Retning.Stigende
            : nesteSorteringsretning(aktivRetning);

        const nyttFelt = nyRetning === null ? null : sorteringsfelt;

        dispatch({
            type: MineStillingerActionType.ChangeMyAdsSorting,
            field: nyttFelt,
            dir: nyRetning,
        });
    };

    const sort = aktivtSorteringsfelt
        ? {
              orderBy: aktivtSorteringsfelt,
              direction: aktivRetning === Retning.Stigende ? 'ascending' : 'descending',
          }
        : undefined;

    if (resultat.kind === Nettstatus.LasterInn) {
        return <Sidelaster className={className} />;
    } else if (resultat.kind === Nettstatus.Suksess && resultat.data.content.length === 0) {
        return (
            <Ingress className={className}>Fant ingen stillinger der du er saksbehandler.</Ingress>
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
            <TabellHeader />
            <TabellBody resultat={resultat} />
        </Table>
    );
};

export default MineStillingerTabell;
