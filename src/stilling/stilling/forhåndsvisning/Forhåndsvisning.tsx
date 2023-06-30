import { Panel } from '@navikt/ds-react';

import { erDirektemeldtStilling } from '../adUtils';
import parse from 'html-react-parser';
import Søknad from './søknad/Søknad';
import Kontaktperson from './kontaktperson/Kontaktperson';
import OmBedriften from './om-bedriften/OmBedriften';
import OmStillingen from './om-stillingen/OmStillingen';
import OmAnnonsen from './om-annonsen/OmAnnonsen';
import MulighetForÅInkludere from './mulighet-for-å-inkludere/MulighetForÅInkludere';
import Stilling from '../../domene/Stilling';
import css from './Forhåndsvisning.module.css';

type Props = {
    stilling: Stilling;
};

const Forhåndsvisning = ({ stilling }: Props) => {
    return (
        <div className={css.forhåndsvisning}>
            <div className={css.venstre}>
                <Panel as="article" className={css.annonsetekst}>
                    {parse(stilling.properties.adtext || '')}
                </Panel>
                {erDirektemeldtStilling(stilling.source) && (
                    <MulighetForÅInkludere tags={stilling.properties.tags} />
                )}
            </div>
            <div className={css.høyre}>
                <Søknad kilde={stilling.source} properties={stilling.properties} />
                <OmStillingen
                    properties={stilling.properties}
                    locationList={stilling.locationList}
                />
                <Kontaktperson contactList={stilling.contactList} />
                <OmBedriften stilling={stilling} />
                <OmAnnonsen stilling={stilling} />
            </div>
        </div>
    );
};

export default Forhåndsvisning;
