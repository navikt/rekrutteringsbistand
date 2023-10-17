import classNames from 'classnames';
import { ReactNode } from 'react';
import css from './HvitBoks.module.css';

type Props = {
    border?: boolean;
    children: ReactNode;
};

const HvitBoks = ({ border, children }: Props) => {
    return (
        <div
            className={classNames(css.hvitBoks, {
                [css.border]: border,
            })}
        >
            {children}
        </div>
    );
};

export default HvitBoks;
