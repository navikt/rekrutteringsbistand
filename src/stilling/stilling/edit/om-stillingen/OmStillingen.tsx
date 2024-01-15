import { TextField } from '@navikt/ds-react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stilling from 'felles/domene/stilling/Stilling';
import { State } from '../../../redux/store';
import { SET_AD_TEXT, SET_EMPLOYMENT_JOBTITLE } from '../../adDataReducer';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Styrk from './styrk/Styrk';

type Props = {
    stilling: Stilling;
};

const OmStillingen = ({ stilling }: Props) => {
    const dispatch = useDispatch();
    const errors = useSelector((state: State) => state.adValidation.errors);

    const handleYrkestittelChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle: event.target.value });
    };

    const onAdTextChange = (adtext: string) => {
        // This function is triggered first time adText is in focus before any letter is written.
        // In this case, just return to avoid the error message from showing before any edits are done.
        if (stilling?.properties.adtext === undefined && adtext === '') {
            return;
        }

        dispatch({ type: SET_AD_TEXT, adtext });
    };

    return (
        <>
            <Styrk />
            <TextField
                value={stilling.properties.jobtitle}
                label="Yrkestittel som vises på stillingen"
                onChange={handleYrkestittelChange}
            />
            <div>
                <Skjemalabel påkrevd inputId="endre-stilling-annonsetekst">
                    Annonsetekst
                </Skjemalabel>
                <RichTextEditor
                    id="endre-stilling-annonsetekst"
                    text={stilling.properties.adtext ?? ''}
                    onChange={onAdTextChange}
                    errorMessage={errors.adText}
                    ariaDescribedBy="stillingstekst"
                />
            </div>
        </>
    );
};

export default OmStillingen;
