import css from './Kort.module.css';
import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

type Props = {
    overskrift: string;
    ikon: ReactNode;
    innhold: ReactNode;
};

const Kort = ({ overskrift, ikon, innhold }: Props) => {
    return (
        <div className={css.kort}>
            <div className={css.innhold}>
                <Heading level="2" size="small" className={css.overskrift}>
                    <div className={css.overskriftMedIkon}>
                        <div className={css.ikonRamme}>{ikon}</div>
                        {overskrift}
                    </div>
                </Heading>
                {innhold}
            </div>
        </div>
    );
};

export default Kort;
