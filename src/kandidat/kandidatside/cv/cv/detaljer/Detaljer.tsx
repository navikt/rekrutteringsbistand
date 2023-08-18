import css from './Detaljer.module.css';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Detaljer = ({ children }: Props) => <div className={css.detaljer}>{children}</div>;

export default Detaljer;
