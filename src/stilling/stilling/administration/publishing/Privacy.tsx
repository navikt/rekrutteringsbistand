import { Radio, RadioGroup } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_PRIVACY } from '../../adDataReducer';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';

export default function Privacy() {
    const dispatch = useDispatch();

    const privacy = useSelector((state: any) => state.adData?.privacy);

    const onPrivacyChange = (privacy: any) => {
        dispatch({ type: SET_PRIVACY, privacy });
    };

    return (
        <RadioGroup
            name="privacy"
            value={privacy}
            onChange={onPrivacyChange}
            legend="Hvor skal stillingen publiseres?"
        >
            <Radio value={PrivacyStatusEnum.INTERNAL_NOT_SHOWN}>Kun internt i NAV</Radio>
            <Radio value={PrivacyStatusEnum.SHOW_ALL}>Eksternt på Arbeidsplassen</Radio>
        </RadioGroup>
    );
}
