import css from './Erfaring.module.css';
import { BodyShort } from '@navikt/ds-react';
import { ReactNode } from 'react';

type Props = {
    overskrift: string;
    beskrivelse: string | ReactNode;
    tidsperiode: ReactNode;
};
const Erfaring = ({ overskrift, beskrivelse, tidsperiode }: Props) => {
    return (
        <div className={css.erfaring}>
            <div className={css.innhold}>
                <BodyShort size="small" className={css.overskrift}>
                    {overskrift}
                </BodyShort>
                {tidsperiode}
                <BodyShort size="small" className={css.beskrivelse}>
                    {beskrivelse}
                </BodyShort>
            </div>
        </div>
    );
};

export default Erfaring;
