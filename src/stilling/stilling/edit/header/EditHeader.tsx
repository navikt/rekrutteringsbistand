import { TextField } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';

import Stilling from 'felles/domene/stilling/Stilling';
import { State } from '../../../redux/store';
import { SET_AD_TITLE } from '../../adDataReducer';
import { DEFAULT_TITLE_NEW_AD } from '../../adReducer';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    stilling: Stilling;
};

const EditHeader = ({ stilling }: Props) => {
    const dispatch = useDispatch();

    const validation = useSelector((state: State) => state.adValidation.errors);

    const onTitleChange = (e) => {
        dispatch({ type: SET_AD_TITLE, title: e.target.value.replace(/^\s+/g, '') });
    };

    const getAdTitle = () => {
        // Hack for hiding the default title coming from backend
        if (stilling.title === DEFAULT_TITLE_NEW_AD) {
            return '';
        }
        return stilling.title || '';
    };

    return (
        <>
            <TextField
                id="endre-stilling-tittel"
                label={
                    <Skjemalabel
                        påkrevd
                        inputId="endre-stilling-tittel"
                        beskrivelse={`For eksempel «engasjert barnehagelærer til Oslo-skole»`}
                    >
                        Overskrift på annonsen
                    </Skjemalabel>
                }
                value={getAdTitle()}
                onChange={onTitleChange}
                aria-describedby="endre-stilling-tittel-beskrivelse"
                error={validation.title}
            />
        </>
    );
};

export default EditHeader;
