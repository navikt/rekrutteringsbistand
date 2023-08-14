import { ReactNode } from 'react';
import css from './Grunnbanner.module.css';

type Props = {
    ikon: ReactNode;
    children?: ReactNode;
};

const Grunnbanner = ({ ikon, children }: Props) => {
    return (
        <div className={css.grunnbanner}>
            <div className={css.inner}>
                <div className={css.piktogram}>{ikon}</div>
                {children}
            </div>
        </div>
    );
};

export default Grunnbanner;
