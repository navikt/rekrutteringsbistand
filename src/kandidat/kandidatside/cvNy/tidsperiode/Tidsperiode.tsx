import { BodyShort } from '@navikt/ds-react';
import ellipse from '../ikoner/ellipse.svg';
import css from './Tidsperiode.module.css';
import { formaterDatoTilMånedOgÅr } from '../../../utils/dateUtils';

type Props = {
    fradato?: string | null;
    tildato?: string | null;
    nåværende?: boolean;
};

const Tidsperiode = ({ fradato, tildato, nåværende }: Props) => {
    const fraDatoFormatert = formaterDatoHvisIkkeNull(fradato);
    const tilDatoFormatert = formaterDatoHvisIkkeNull(tildato);

    if (fraDatoFormatert && tilDatoFormatert) {
        return (
            <div className={css.tidsperiode}>
                <BodyShort size="small" className={css.tekst}>
                    {fraDatoFormatert} – {tilDatoFormatert}
                    {nåværende && ' nå'}
                </BodyShort>
                <div className={css.ikon}>
                    <img src={ellipse} alt="" />
                </div>
                <BodyShort size="small" className={css.tekst}>
                    Her kommer antall måneder og år
                </BodyShort>
            </div>
        );
    } else if (fraDatoFormatert) {
        return (
            <div className={css.tidsperiode}>
                <BodyShort size="small" className={css.tekst}>
                    {fraDatoFormatert}
                    {nåværende && ' – nå'}
                </BodyShort>
                <div className={css.ikon}>
                    <img src={ellipse} alt="" />
                </div>
                <BodyShort size="small" className={css.tekst}>
                    Her kommer antall måneder og år
                </BodyShort>
            </div>
        );
    } else if (tilDatoFormatert) {
        return (
            <div className={css.tidsperiode}>
                <BodyShort size="small" className={css.tekst}>
                    {tilDatoFormatert}
                    {nåværende && ' nå'}
                </BodyShort>
                <div className={css.ikon}>
                    <img src={ellipse} alt="" />
                </div>
                <BodyShort size="small" className={css.tekst}>
                    Her kommer antall måneder og år
                </BodyShort>
            </div>
        );
    }

    return (
        <div className={css.tidsperiode}>
            <BodyShort size="small" className={css.tekst}>
                {nåværende && ' nå'}
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

const formaterDatoHvisIkkeNull = (dato?: string | null) => {
    if (!dato) {
        return null;
    }

    return formaterDatoTilMånedOgÅr(dato);
};

export default Tidsperiode;
