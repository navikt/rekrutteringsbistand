import { FunctionComponent } from 'react';
import classNames from 'classnames';
import css from './Telling.module.css';

type Props = {
    tall: number;
    beskrivelse: string;
    className: string;
};

const Telling: FunctionComponent<Props> = ({ tall, beskrivelse, className }) => {
    const klassenavn = classNames(css.telling, className);

    return (
        <p className={klassenavn}>
            <span className={css.tall}>{tall}</span>
            {beskrivelse}
        </p>
    );
};

export default Telling;
