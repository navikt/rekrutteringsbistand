import { ReactNode } from 'react';
import css from './Grunnbanner.module.css';

type Props = {
    ikon: ReactNode;
    children?: ReactNode;
    nederst?: ReactNode;
};

const Grunnbanner = ({ ikon, children, nederst }: Props) => {
    return (
        <div role="banner" className={css.grunnbanner}>
            <div className={css.piktogramOgChildren}>
                <div className={css.piktogram}>{ikon}</div>
                {children}
            </div>
            {nederst}
        </div>
    );
};

export default Grunnbanner;
