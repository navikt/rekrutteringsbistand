import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@navikt/ds-react';
import { Status } from 'felles/domene/stilling/Stilling';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { MineStillingerActionType } from '../MineStillingerAction';
import css from './Filter.module.css';

const Synlighet = {
    Aktive: false,
    Utløpte: true,
};

type Props = {
    className?: string;
};

const Filter = ({ className }: Props) => {
    const { filter, deactivatedByExpiry } = useSelector((state: State) => state.mineStillinger);
    const dispatch = useDispatch();
    const { status } = filter;

    const onStatusToggle = (nyeStatuser: string[]) => {
        dispatch({
            type: MineStillingerActionType.ChangeMyAdsStatusFilter,
            status: nyeStatuser,
        });
    };

    const onExpiredChange = (deactivatedByExpiry: boolean) => {
        dispatch({
            type: MineStillingerActionType.ChangeMyAdsDeactivatedFilter,
            deactivatedByExpiry: deactivatedByExpiry,
        });
    };

    return (
        <>
            <RadioGroup
                className={css.synlighet}
                legend="Synlighet"
                onChange={onExpiredChange}
                value={deactivatedByExpiry}
            >
                <Radio value={Synlighet.Aktive}>Aktive</Radio>
                <Radio value={Synlighet.Utløpte}>Utløpte</Radio>
            </RadioGroup>
            {!deactivatedByExpiry && (
                <CheckboxGroup legend="Status" onChange={onStatusToggle} value={status}>
                    <Checkbox value={Status.Aktiv}>Publisert</Checkbox>
                    <Checkbox value={Status.Inaktiv}>Ikke Publisert</Checkbox>
                    <Checkbox value={Status.Stoppet}>Stoppet</Checkbox>
                </CheckboxGroup>
            )}
        </>
    );
};

export default Filter;
