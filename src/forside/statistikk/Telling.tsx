import { BodyShort, Skeleton } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './Telling.module.css';

type Props = {
    tall?: number;
    beskrivelse: string;
    ikon?: React.ReactNode;
    detaljer?: React.ReactNode;
};

const Telling: FunctionComponent<Props> = ({ tall, beskrivelse, ikon, detaljer = null }) => {
    return (
        <div className={css.telling}>
            <div>
                <BodyShort className={css.headerTekst}>{beskrivelse}</BodyShort>
                <span className={css.tall}>{tall ?? <Skeleton width={40} />}</span>
                {detaljer}
            </div>
            <div className={css.ikon}>{ikon}</div>
        </div>
    );
};

export default Telling;
