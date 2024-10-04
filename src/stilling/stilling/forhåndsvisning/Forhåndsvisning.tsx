import { Panel } from '@navikt/ds-react';

import Stilling from 'felles/domene/stilling/Stilling';
import useKandidatlisteId from 'felles/hooks/useKandidatlisteId';
import parse from 'html-react-parser';
import { erDirektemeldtStilling } from '../adUtils';
import { AntallKandidaterIStilling } from './antall-kandidater/AntallKandidater';
import css from './Forhåndsvisning.module.css';
import Kontaktperson from './kontaktperson/Kontaktperson';
import MulighetForÅInkludere from './mulighet-for-å-inkludere/MulighetForÅInkludere';
import OmAnnonsen from './om-annonsen/OmAnnonsen';
import OmBedriften from './om-bedriften/OmBedriften';
import OmStillingen from './om-stillingen/OmStillingen';
import Søknad from './søknad/Søknad';

type Props = {
    stilling: Stilling;
    erFormidling: boolean;
};

const Forhåndsvisning = ({ stilling, erFormidling }: Props) => {
    const { kandidatlisteId } = useKandidatlisteId(stilling.uuid);

    return (
        <div className={css.forhåndsvisning}>
            <div className={css.venstre}>
                {kandidatlisteId && (
                    <AntallKandidaterIStilling
                        kandidatelisteId={kandidatlisteId}
                    ></AntallKandidaterIStilling>
                )}
                <Panel as="article" className={css.annonsetekst}>
                    {erFormidling ? (
                        <span>Formidling</span>
                    ) : (
                        parse(stilling.properties.adtext || '')
                    )}
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
