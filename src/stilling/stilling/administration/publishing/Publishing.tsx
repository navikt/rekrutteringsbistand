import { DatePicker, DateValidationT, useDatepicker } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leggTilTimerPåISOString } from '../../../utils/datoUtils';
import { SET_EXPIRATION_DATE, SET_PUBLISHED } from '../../adDataReducer';
import Skjemalabel from '../../edit/skjemaetikett/Skjemalabel';
import css from './Publishing.module.css';

const Publishing = () => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const published = useSelector((state: any) => state.adData?.published);
    const expires = useSelector((state: any) => state.adData?.expires);
    const validation = useSelector((state: any) => state.adValidation.errors);

    const [publishDateInput, setPublishDateInput] = useState<Date | undefined>(new Date(published));
    const [expirationDateInput, setExpirationDateInput] = useState<Date | undefined>(
        new Date(expires)
    );

    const iGår = () => {
        const iGår = new Date();
        iGår.setDate(currentDate.getDate() - 1);
        return iGår;
    };

    React.useEffect(() => {
        if (publishDateInput) {
            dispatch({
                type: SET_PUBLISHED,
                published: leggTilTimerPåISOString(publishDateInput.toISOString(), 3),
            });
        }
    }, [publishDateInput, dispatch]);

    React.useEffect(() => {
        if (expirationDateInput) {
            dispatch({
                type: SET_EXPIRATION_DATE,
                expires: leggTilTimerPåISOString(expirationDateInput.toISOString(), 3),
            });
        }
    }, [expirationDateInput, dispatch]);

    const onValidatePublished = (validation: DateValidationT) => {
        if (validation.isBefore) {
            setPublishDateInput(iGår());
        }
    };

    const onValidateExpirationDate = (validation: DateValidationT) => {
        if (validation.isBefore) {
            setExpirationDateInput(iGår());
        }
    };

    const datePickerDefaultProps = {
        fromDate: currentDate,
        openOnFocus: false,
        inputFormat: 'dd.MM.yyyy',
        allowTwoDigitYear: false,
    };
    const datepickerPropsPublished = useDatepicker({
        ...datePickerDefaultProps,
        locale: 'nb',
        defaultSelected: new Date(published),
        onDateChange: (date) => setPublishDateInput(date),
        onValidate: onValidatePublished,
    });

    const datepickerPropsExpirationDate = useDatepicker({
        ...datePickerDefaultProps,
        locale: 'nb',
        defaultSelected: new Date(expires),
        onDateChange: (date) => setExpirationDateInput(date),
        onValidate: onValidateExpirationDate,
    });

    return (
        <div className={css.publishing}>
            <div>
                <DatePicker {...datepickerPropsPublished.datepickerProps}>
                    <DatePicker.Input
                        {...datepickerPropsPublished.inputProps}
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
