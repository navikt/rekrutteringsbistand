import { BodyShort } from '@navikt/ds-react';
import { formaterDatoHvisIkkeNull } from '../../../../utils/dateUtils';
import css from '../Cv.module.css';
import Detaljer from '../detaljer/Detaljer';

type Props = {
    fradato?: string | null;
    tildato?: string | null;
    nåværende?: boolean;
    sted?: string;
};

const Erfaringsdetaljer = ({ fradato, tildato, nåværende, sted }: Props) => {
    const fraDatoFormatert = formaterDatoHvisIkkeNull(fradato);
    const tilDatoFormatert = formaterDatoHvisIkkeNull(tildato);

    let tidsperiode = null;

    if (fraDatoFormatert && tilDatoFormatert) {
        tidsperiode = (
            <>
                <BodyShort size="small" spacing className={css.tekst}>
                    {fraDatoFormatert} – {tilDatoFormatert}
                    {nåværende && ' nå'}
                </BodyShort>
                <BodyShort size="small" spacing className={css.tekst}>
                    {diffMellomToDatoer(fradato, tildato)}
                </BodyShort>
            </>
        );
    } else if (fraDatoFormatert) {
        tidsperiode = (
            <>
                <BodyShort size="small" spacing className={css.tekst}>
                    {fraDatoFormatert}
                    {nåværende && ' – nå'}
                </BodyShort>
                <BodyShort size="small" spacing className={css.tekst}>
                    {diffMellomToDatoer(fradato, new Date().toString())}
                </BodyShort>
            </>
        );
    } else if (tilDatoFormatert) {
        tidsperiode = (
            <>
                <BodyShort size="small" spacing className={css.tekst}>
                    {tilDatoFormatert}
                    {nåværende && ' nå'}
                </BodyShort>
                <BodyShort size="small" spacing className={css.tekst}>
                    {diffMellomToDatoer(tildato, tildato)}
                </BodyShort>
            </>
        );
    } else {
        tidsperiode = (
            <BodyShort size="small" spacing className={css.tekst}>
                {nåværende && ' nåværende'}
            </BodyShort>
        );
    }

    return (
        <Detaljer>
            {sted && (
                <BodyShort size="small" spacing className={css.tekst}>
                    {sted}
                </BodyShort>
            )}
            {tidsperiode}
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

export default Erfaringsdetaljer;
