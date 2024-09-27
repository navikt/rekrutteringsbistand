import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stilling from 'felles/domene/stilling/Stilling';
import RikTekstEditor from '../../../../felles/komponenter/rikteksteditor/RikTekstEditor';
import { State } from '../../../redux/store';
import { SET_AD_TEXT, SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../adDataReducer';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Janzz from './janzz/Janzz';
import { JanzzStilling } from '../../../api/api';

type Props = {
    stilling: Stilling;
    erFormidling: boolean;
};

const OmStillingen = ({ stilling, erFormidling }: Props) => {
    const dispatch = useDispatch();
    const errors = useSelector((state: State) => state.adValidation.errors);
    console.info('stilling', stilling);
    const kategoriJanzz = stilling?.categoryList?.find(
        (kategori) => kategori?.categoryType === 'JANZZ'
    );
    const [janzzStilling, setJanzzStilling] = useState<JanzzStilling | null>(
        kategoriJanzz
            ? {
                  konseptId: +kategoriJanzz.code,
                  label: kategoriJanzz.name,
              }
            : null
    );

    if (janzzStilling) {
        dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle: janzzStilling.label });
        const kategori = [
            {
                id: janzzStilling.konseptId,
                code: janzzStilling.konseptId.toString(),
                categoryType: 'JANZZ',
                name: janzzStilling.label,
                description: null,
                parentId: null,
            },
        ];
        dispatch({ type: SET_JANZZ, kategori });
    }
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
            <Janzz janzzStilling={janzzStilling} setJanzzStilling={setJanzzStilling} />
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
