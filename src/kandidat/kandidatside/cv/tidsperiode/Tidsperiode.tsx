import { BodyShort } from '@navikt/ds-react';
import ellipse from '../ikoner/ellipse.svg';
import css from './Tidsperiode.module.css';

const Tidsperiode = () => {
    return (
        <div className={css.tidsperiode}>
            <BodyShort size="small" className={css.tekst}>
                Her kommer tid
            </BodyShort>
            <div className={css.ikon}>
                <img src={ellipse} alt="" />
            </div>
            <BodyShort size="small" className={css.tekst}>
                Her kommer antall måneder og år
            </BodyShort>
        </div>
    );
};

export default Tidsperiode;
