import css from './Erfaring.module.css';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

type Props = {
    overskrift: string;
    beskrivelse: string | ReactNode;
    tidsperiode: ReactNode;
};
const Erfaring = ({ overskrift, beskrivelse, tidsperiode }: Props) => {
    return (
        <div>
            <Heading size="xsmall" level="3" className={css.overskrift}>
                {overskrift}
            </Heading>
            {tidsperiode}
            <BodyLong size="small" className={css.beskrivelse}>
                {beskrivelse}
            </BodyLong>
        </div>
    );
};

export default Erfaring;
