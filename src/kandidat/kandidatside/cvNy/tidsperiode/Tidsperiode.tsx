import { BodyShort } from '@navikt/ds-react';
import ellipse from '../ikoner/ellipse.svg';
import css from './Tidsperiode.module.css';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';

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
                    {diffMellomToDatoer(fradato, tildato)}
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
                    {diffMellomToDatoer(fradato, new Date().toString())}
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
                    {diffMellomToDatoer(tildato, tildato)}
                </BodyShort>
            </div>
        );
    }

    return (
        <div className={css.tidsperiode}>
            <BodyShort size="small" className={css.tekst}>
                {nåværende && ' nåværende'}
            </BodyShort>
        </div>
    );
};

const diffMellomToDatoer = (fraDato: string, tilDato: string): string => {
    const startDato = new Date(fraDato);
    const sluttDato = new Date(tilDato);
    const månedDiff =
        sluttDato.getMonth() -
        startDato.getMonth() +
        12 * (sluttDato.getFullYear() - startDato.getFullYear());

    if (månedDiff === 0) {
        return '1 måned';
    }

    const antallÅr = (månedDiff / 12) | 0;
    const antallMåneder = (månedDiff % 12) + 1;

    if (antallÅr === 0 && antallMåneder < 12) {
        return antallMåneder + ' måneder';
    } else if (antallMåneder === 12) {
        return antallÅr + 1 + ' år';
    } else if (antallÅr > 0 && antallMåneder > 1) {
        return antallÅr + ' år, ' + antallMåneder + ' måneder';
    } else if (antallÅr > 0 && antallMåneder === 1) {
        return antallÅr + ' år';
    }

    return '';
};

export default Tidsperiode;
