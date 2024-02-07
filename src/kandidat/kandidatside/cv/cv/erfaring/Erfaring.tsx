import { BodyLong, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
import css from './Erfaring.module.css';

type Props = {
    overskrift?: string | null;
    beskrivelse?: string | ReactNode;
    detaljer?: ReactNode;
};
const Erfaring = ({ overskrift, beskrivelse, detaljer }: Props) => {
    return (
        <div>
            {overskrift && (
                <Heading size="xsmall" level="3" className={css.overskrift}>
                    {overskrift}
                </Heading>
            )}
            {detaljer}
            {beskrivelse && <BodyLong size="small">{beskrivelse}</BodyLong>}
        </div>
    );
};

export default Erfaring;
