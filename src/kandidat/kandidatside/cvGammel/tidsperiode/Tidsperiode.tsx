import { formaterDatoTilMånedOgÅr } from '../../../utils/dateUtils';
import { FunctionComponent } from 'react';
import ellipse from '../../cv/ikoner/ellipse.svg';
import css from './Tidsperiode.module.css';
import { BodyShort } from '@navikt/ds-react';

type Props = {
    fradato?: string | null;
    tildato?: string | null;
    navarende?: boolean;
};

const Tidsperiode = ({ fradato, tildato, navarende }: Props) => {
    const fradatoFormatted = formaterDatoHvisIkkeNull(fradato);
    const tildatoFormatted = formaterDatoHvisIkkeNull(tildato);

    console.log(beregnAntallMåneder(tildatoFormatted, fradatoFormatted));

    if (fradatoFormatted && tildatoFormatted) {
        return (
            <BodyShort size="small">
                {fradatoFormatted} – {tildatoFormatted}
                {navarende && ' nå'}
                {!navarende && (
                    <AntallMånederOgÅrMedIkon
                        tilDato={tildato}
                        fraDato={fradato}
                        ikonSrc={ellipse}
                    />
                )}
            </BodyShort>
        );
    } else if (fradatoFormatted) {
        return (
            <BodyShort size="small">
                {fradatoFormatted}
                {navarende && ' – nå'}
            </BodyShort>
        );
    } else if (tildatoFormatted) {
        return (
            <BodyShort size="small">
                {tildatoFormatted}
                {navarende && ' nå'}
            </BodyShort>
        );
    }
    return <span>{navarende && 'nå'}</span>;
};

const beregnAntallMåneder = (tilDato: string | null, fraDato: string | null) => {
    const månedDiff = new Date(tilDato).getMonth() - new Date(fraDato).getMonth();
    const årDiff = new Date(tilDato).getFullYear() - new Date(fraDato).getFullYear();

    return månedDiff + årDiff * 12;
};

const AntallMånederOgÅrMedIkon: FunctionComponent<{
    tilDato: string | null;
    fraDato: string | null;
    ikonSrc: string;
}> = ({ tilDato, fraDato, ikonSrc }) => (
    <div className={css.antallMånederOgÅr}>
        <div className={css.ikon}>
            <img src={ikonSrc} alt="" />
        </div>
        {beregnAntallMåneder(tilDato, fraDato)}
    </div>
);

const formaterDatoHvisIkkeNull = (dato?: string | null) => {
    if (!dato) {
        return null;
    }

    return formaterDatoTilMånedOgÅr(dato);
};

export default Tidsperiode;
