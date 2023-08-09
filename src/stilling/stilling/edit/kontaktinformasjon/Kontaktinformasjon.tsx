import { Fieldset, TextField } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { Kontaktinfo } from 'felles/domene/stilling/Stilling';
import { State } from '../../../redux/store';
import { SET_CONTACT_PERSON } from '../../adDataReducer';
import {
    VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE,
    VALIDATE_CONTACTPERSON_NAME,
    VALIDATE_CONTACTPERSON_TITLE,
    ValidertFelt,
} from '../../adValidationReducer';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    contactList?: Kontaktinfo[];
    setContactPerson: (kontaktperson: any) => void;
    validateEmailAndPhone: () => void;
    validateTitle: () => void;
    validateName: () => void;
    validation: Record<ValidertFelt, string | undefined>;
};

const Kontaktinformasjon: FunctionComponent<Props> = ({
    contactList,
    setContactPerson,
    validateEmailAndPhone,
    validateTitle,
    validateName,
    validation,
}) => {
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            name: e.target.value,
        });
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            title: e.target.value,
        });
    };

    const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            phone: e.target.value,
        });
    };

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            email: e.target.value,
        });
    };

    const kontaktperson = contactList && contactList[0];

    return (
        <>
            <TextField
                label={<Skjemalabel påkrevd>Navn på kontaktperson</Skjemalabel>}
                value={kontaktperson?.name ?? ''}
                onChange={onNameChange}
                error={validation.contactPersonName}
                onBlur={validateName}
            />

            <TextField
                label={
                    <Skjemalabel påkrevd beskrivelse="For eksempel: leder, NAV-ansatt">
                        Tittel på kontaktperson
                    </Skjemalabel>
                }
                value={kontaktperson?.title ?? ''}
                onChange={onTitleChange}
                error={validation.contactPersonTitle}
                onBlur={validateTitle}
            />
            <Fieldset
                legend={<Skjemalabel påkrevd>E-postadresse og/eller telefonnummer</Skjemalabel>}
                error={validation.contactPersonEmailOrPhone}
            >
                <TextField
                    type="email"
                    label="E-postadresse"
                    value={kontaktperson?.email ?? ''}
                    onChange={onEmailChange}
                    onBlur={validateEmailAndPhone}
                    error={validation.contactPersonEmail}
                />
                <TextField
                    type="tel"
                    label="Telefonnummer"
                    value={kontaktperson?.phone ?? ''}
                    onBlur={validateEmailAndPhone}
                    error={validation.contactPersonPhone}
                    onChange={onPhoneChange}
                />
            </Fieldset>
        </>
    );
};

const mapStateToProps = (state: State) => ({
    contactList: state.adData?.contactList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setContactPerson: (contactPerson: any) => dispatch({ type: SET_CONTACT_PERSON, contactPerson }),
    validateEmailAndPhone: () => dispatch({ type: VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE }),
    validateTitle: () => dispatch({ type: VALIDATE_CONTACTPERSON_TITLE }),
    validateName: () => dispatch({ type: VALIDATE_CONTACTPERSON_NAME }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Kontaktinformasjon);
