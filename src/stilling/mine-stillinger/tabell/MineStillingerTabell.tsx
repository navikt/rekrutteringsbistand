import { ErrorMessage, Ingress, SortState, Table } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useDispatch, useSelector } from 'react-redux';
import Sidelaster from '../../common/sidelaster/Sidelaster';
import { State } from '../../redux/store';
import { MineStillingerActionType } from '../MineStillingerAction';
import { MineStillingerSorteringsfelt } from '../MineStillingerSortering';
import { MineStillingerResultat } from '../mineStillingerReducer';
import css from './MineStillingerTabell.module.css';
import { Retning, nesteSorteringsretning } from './Retning';
import TabellBody from './TabellBody';
import TabellHeader from './TabellHeader';
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
        <>
            {resultat.kind === Nettstatus.Feil && (
                <ErrorMessage className={css.feilmelding}>
                    Klarte ikke hente mine stillinger
                </ErrorMessage>
            )}
            {resultat.kind === Nettstatus.Suksess &&
                resultat.data.content.map((rekrutteringsbistandstilling) => (
                    <div key={rekrutteringsbistandstilling.stilling.uuid}>
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
                    </div>
                ))}
        </>
    );
};

export default MineStillingerTabell;
