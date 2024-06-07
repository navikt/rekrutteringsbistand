import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useContext } from 'react';
import { KandidatSøkContext } from '../KandidatSøkContext';
import filterCss from './Filter.module.css';

const TømFiltre = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    return (
        <div className={filterCss.tømFilter}>
            <Button
                icon={<TrashIcon aria-hidden />}
                variant="tertiary"
                onClick={kriterier.fjernSøkekriterier}
            >
                Tøm filtre
            </Button>
        </div>
    );
};

export default TømFiltre;
