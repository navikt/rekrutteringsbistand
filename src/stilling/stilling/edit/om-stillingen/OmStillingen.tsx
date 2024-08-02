import { TextField } from '@navikt/ds-react';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stilling from 'felles/domene/stilling/Stilling';
import RikTekstEditor from '../../../../felles/komponenter/rikteksteditor/RikTekstEditor';
import { State } from '../../../redux/store';
import { SET_AD_TEXT, SET_EMPLOYMENT_JOBTITLE } from '../../adDataReducer';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Styrk from './styrk/Styrk';

type Props = {
    stilling: Stilling;
    erFormidling: boolean;
};

const OmStillingen = ({ stilling, erFormidling }: Props) => {
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

    useEffect(() => {
        if (erFormidling) {
            dispatch({ type: SET_AD_TEXT, adtext: 'Formidling' });
        }
    }, [erFormidling, dispatch]);

    return (
        <>
            <Styrk />
            <TextField
                value={stilling.properties.jobtitle}
                label="Yrkestittel som vises på stillingen"
                onChange={handleYrkestittelChange}
            />
            {!erFormidling && (
                <div>
                    <Skjemalabel påkrevd inputId="endre-stilling-annonsetekst">
                        Annonsetekst
                    </Skjemalabel>
                    <RikTekstEditor
                        id="endre-stilling-annonsetekst"
                        tekst={stilling.properties.adtext ?? ''}
                        onChange={onAdTextChange}
                        feilMelding={errors.adText}
                    />
                </div>
            )}
        </>
    );
};

export default OmStillingen;
