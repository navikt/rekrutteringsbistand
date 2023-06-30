import { BaseSyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leggTilTimerPåISOString } from '../../../utils/datoUtils';
import { SET_PUBLISHED, SET_EXPIRATION_DATE } from '../../adDataReducer';
import { DatePicker, DateValidationT, useDatepicker } from '@navikt/ds-react';
import Skjemalabel from '../../edit/skjemaetikett/Skjemalabel';
import css from './Publishing.module.css';

export type Validation = {
    expires: string;
    published: string;
};

const Publishing = () => {
    const dispatch = useDispatch();

    const published = useSelector((state: any) => state.adData?.published);
    const expires = useSelector((state: any) => state.adData?.expires);
    const validation = useSelector((state: any) => state.adValidation.errors);

    const [publishDateInput, setPublishDateInput] = useState<Date | undefined>(new Date(published));
    const [expirationDateInput, setExpirationDateInput] = useState<Date | undefined>(
        new Date(expires)
    );

    const iGår = () => {
        const iGår = new Date();
        iGår.setDate(iGår.getDate() - 1);
        return iGår;
    };

    const onBlurPublishDate = (input: BaseSyntheticEvent) => {
        const dateString = input.target.value;

        if (!dateString || !publishDateInput) {
            dispatch({ type: SET_PUBLISHED, published: dateString });
            return;
        }
        dispatch({
            type: SET_PUBLISHED,
            published: leggTilTimerPåISOString(publishDateInput.toISOString(), 3),
        });
    };

    const onBlurExpirationDate = (input: BaseSyntheticEvent) => {
        const dateString = input.target.value;

        if (!dateString || !expirationDateInput) {
            dispatch({ type: SET_EXPIRATION_DATE, expires: dateString });
            return;
        }
        dispatch({
            type: SET_EXPIRATION_DATE,
            expires: leggTilTimerPåISOString(expirationDateInput.toISOString(), 3),
        });
    };

    const onPublishChange = (date: Date) => {
        setPublishDateInput(date);
    };

    const onValidatePublished = (validation: DateValidationT) => {
        if (validation.isBefore) {
            setPublishDateInput(iGår());
        }
    };

    const onExpirationDateChange = (date: Date) => {
        setExpirationDateInput(date);
    };

    const onValidateExpirationDate = (validation: DateValidationT) => {
        if (validation.isBefore) {
            setExpirationDateInput(iGår());
        }
    };

    const datePickerDefaultProps = {
        fromDate: new Date(),
        openOnFocus: false,
        inputFormat: 'dd.MM.yyyy',
        allowTwoDigitYear: false,
    };
    const datepickerPropsPublished = useDatepicker({
        ...datePickerDefaultProps,
        locale: 'nb',
        defaultSelected: new Date(published),
        onDateChange: onPublishChange,
        onValidate: onValidatePublished,
    });

    const datepickerPropsExpirationDate = useDatepicker({
        ...datePickerDefaultProps,
        locale: 'nb',
        defaultSelected: new Date(expires),
        onDateChange: onExpirationDateChange,
        onValidate: onValidateExpirationDate,
    });

    return (
        <div className={css.publishing}>
            <div>
                <DatePicker {...datepickerPropsPublished.datepickerProps}>
                    <DatePicker.Input
                        {...datepickerPropsPublished.inputProps}
                        onBlur={onBlurPublishDate}
                        error={validation.published}
                        label={<Skjemalabel>Publiseringsdato</Skjemalabel>}
                        placeholder="dd.mm.yyyy"
                    />
                </DatePicker>
            </div>
            <div>
                <DatePicker {...datepickerPropsExpirationDate.datepickerProps}>
                    <DatePicker.Input
                        {...datepickerPropsExpirationDate.inputProps}
                        onBlur={onBlurExpirationDate}
                        error={validation.expires}
                        label={<Skjemalabel>Siste visningsdato</Skjemalabel>}
                        placeholder="dd.mm.yyyy"
                    />
                </DatePicker>
            </div>
        </div>
    );
};

export default Publishing;
