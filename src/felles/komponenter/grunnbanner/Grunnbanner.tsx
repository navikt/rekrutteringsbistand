import { ReactNode } from 'react';
import css from './Grunnbanner.module.css';

type Props = {
    ikon: ReactNode;
    children?: ReactNode;
    nederst?: ReactNode;
};

const Grunnbanner = ({ ikon, children, nederst }: Props) => {
    return (
        <div className={css.grunnbanner}>
            <div className={css.inner}>
                <div className={css.piktogramOgChildren}>
                    <div className={css.piktogram}>{ikon}</div>
                    {children}
                </div>
                {nederst}
            </div>
        </div>
    );
};

export default Grunnbanner;
