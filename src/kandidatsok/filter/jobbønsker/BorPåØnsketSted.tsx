import { Checkbox } from '@navikt/ds-react';
import { ChangeEventHandler, useContext, useEffect } from 'react';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { FilterParam } from '../../hooks/useQuery';
import filterCss from '../Filter.module.css';

const BorPåØnsketSted = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    useEffect(() => {
        if (
            kriterier.søkekriterier.ønsketSted.size === 0 &&
            kriterier.søkekriterier.borPåØnsketSted
        ) {
            kriterier.setSøkeparameter(FilterParam.BorPåØnsketSted, null);
        }
    }, [kriterier]);

    if (kriterier.søkekriterier.ønsketSted.size === 0) {
        return null;
    }

    const onChange: ChangeEventHandler = () => {
        kriterier.setSøkeparameter(
            FilterParam.BorPåØnsketSted,
            kriterier.søkekriterier.borPåØnsketSted === true ? null : String(true)
        );
    };

    const checked = kriterier.søkekriterier.borPåØnsketSted || false;

    return (
        <Checkbox checked={checked} onChange={onChange} className={filterCss.borPåØnsketSted}>
            Kandidaten må også bo på stedet
        </Checkbox>
    );
};

export default BorPåØnsketSted;
