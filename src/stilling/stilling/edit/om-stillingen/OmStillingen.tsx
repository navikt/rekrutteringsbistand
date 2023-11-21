import { useDispatch, useSelector } from 'react-redux';

import Stilling from 'felles/domene/stilling/Stilling';
import { State } from '../../../redux/store';
import { SET_AD_TEXT } from '../../adDataReducer';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    stilling: Stilling;
};

const OmStillingen = ({ stilling }: Props) => {
    const dispatch = useDispatch();
    const errors = useSelector((state: State) => state.adValidation.errors);

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
