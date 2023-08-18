import css from './Erfaring.module.css';
import { BodyShort, Heading } from '@navikt/ds-react';
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
            <BodyShort size="small" className={css.beskrivelse}>
                {beskrivelse}
            </BodyShort>
        </div>
    );
};

export default Erfaring;
