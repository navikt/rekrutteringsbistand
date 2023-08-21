import { BodyShort } from '@navikt/ds-react';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import Detaljer from './detaljer/Detaljer';
import css from './Cv.module.css';

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
            <Detaljer>
                <BodyShort size="small" spacing className={css.tekst}>
                    {fraDatoFormatert} – {tilDatoFormatert}
                    {nåværende && ' nå'}
                </BodyShort>
                <BodyShort size="small" spacing className={css.tekst}>
                    {diffMellomToDatoer(fradato, tildato)}
                </BodyShort>
            </Detaljer>
        );
    } else if (fraDatoFormatert) {
        return (
            <Detaljer>
                <BodyShort size="small" spacing className={css.tekst}>
                    {fraDatoFormatert}
                    {nåværende && ' – nå'}
                </BodyShort>
                <BodyShort size="small" spacing className={css.tekst}>
                    {diffMellomToDatoer(fradato, new Date().toString())}
                </BodyShort>
            </Detaljer>
        );
    } else if (tilDatoFormatert) {
        return (
            <Detaljer>
                <BodyShort size="small" spacing className={css.tekst}>
                    {tilDatoFormatert}
                    {nåværende && ' nå'}
                </BodyShort>
                <BodyShort size="small" spacing className={css.tekst}>
                    {diffMellomToDatoer(tildato, tildato)}
                </BodyShort>
            </Detaljer>
        );
    }

    return (
        <Detaljer>
            <BodyShort size="small" spacing className={css.tekst}>
                {nåværende && ' nåværende'}
            </BodyShort>
        </Detaljer>
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
