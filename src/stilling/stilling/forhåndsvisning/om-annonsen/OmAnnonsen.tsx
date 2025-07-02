import { Heading, Panel } from '@navikt/ds-react';
import Stilling from 'felles/domene/stilling/Stilling';
import { formatISOString } from '../../../utils/datoUtils';
import css from '../Forhåndsvisning.module.css';

type Props = {
    stilling: Stilling;
};

const OmAnnonsen = ({ stilling }: Props) => {
    const { updated, medium, reference, annonsenr } = stilling;

    return (
        <Panel className={css.infoboks}>
            <Heading spacing level="3" size="small">
                Om annonsen
            </Heading>
            <dl className={css.definisjonsliste}>
                {updated && (
                    <>
                        <dt key="dt">Sist endret:</dt>
                        <dd key="dd">{formatISOString(updated, 'DD.MM.YYYY')}</dd>
                    </>
                )}
                {medium && (
                    <>
                        <dt key="dt">Hentet fra:</dt>
                        <dd key="dd">{medium}</dd>
                    </>
                )}
                {annonsenr && (
                    <>
                        <dt key="dt">Annonsenummer:</dt>
                        <dd key="dd">{annonsenr}</dd>
                    </>
                )}
                {reference && (
                    <>
                        <dt key="dt">Referanse:</dt>
                        <dd key="dd">{reference}</dd>
                    </>
                )}
            </dl>
        </Panel>
    );
};

export default OmAnnonsen;
