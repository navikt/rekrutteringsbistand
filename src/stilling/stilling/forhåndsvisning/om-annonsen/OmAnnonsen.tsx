import { Heading, Panel } from '@navikt/ds-react';
import { formatISOString } from '../../../utils/datoUtils';
import css from '../Forhåndsvisning.module.css';
import Stilling from '../../../domene/Stilling';

type Props = {
    stilling: Stilling;
};

const OmAnnonsen = ({ stilling }: Props) => {
    const { updated, medium, reference, id } = stilling;

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
                {id && (
                    <>
                        <dt key="dt">Annonsenummer:</dt>
                        <dd key="dd">{id}</dd>
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
