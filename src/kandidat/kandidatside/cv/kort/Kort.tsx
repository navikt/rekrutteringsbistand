import css from './Kort.module.css';
import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

type Props = {
    overskrift: string;
    ikon: ReactNode;
    children: ReactNode;
};

const Kort = ({ overskrift, ikon, children }: Props) => {
    return (
        <div className={css.kort}>
            <div className={css.innhold}>
                <Heading level="2" size="small" className={css.overskrift}>
                    <div className={css.overskriftMedIkon}>
                        <div className={css.ikonRamme}>{ikon}</div>
                        {overskrift}
                    </div>
                </Heading>
                {children}
            </div>
        </div>
    );
};

export default Kort;
