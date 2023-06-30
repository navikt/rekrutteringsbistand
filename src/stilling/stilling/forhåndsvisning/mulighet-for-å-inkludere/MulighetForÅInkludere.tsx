import { FunctionComponent } from 'react';
import { ErrorMessage, Heading, Panel } from '@navikt/ds-react';
import { tagsInneholderInkluderingsmuligheter } from '../../tags/utils';
import Inkluderingsmuligheter from './Inkluderingsmuligheter';
import isJson from '../../edit/praktiske-opplysninger/IsJson';
import css from './MulighetForÅInkludere.module.css';

type Props = {
    tags?: string;
};

const MulighetForÅInkludere: FunctionComponent<Props> = ({ tags }) => {
    if (tags === undefined) {
        return null;
    }

    const tagsErGyldige = isJson(tags);

    if (!tagsErGyldige) {
        return (
            <Panel className={css.mulighet}>
                <ErrorMessage>
                    Noe galt skjedde ved uthenting av inkluderingsmuligheter.
                </ErrorMessage>
            </Panel>
        );
    }

    if (!tagsInneholderInkluderingsmuligheter(tags)) {
        return null;
    }

    const registrerteTags = JSON.parse(tags);

    return (
        <Panel className={css.mulighet}>
            <Heading spacing level="3" size="medium" className={css.tittel}>
                Mulighet for å inkludere
            </Heading>
            <Inkluderingsmuligheter registrerteTags={registrerteTags} />
        </Panel>
    );
};

export default MulighetForÅInkludere;
