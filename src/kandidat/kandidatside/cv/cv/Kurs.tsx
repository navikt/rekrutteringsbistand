import { ClipboardIcon } from '@navikt/aksel-icons';
import css from './Cv.module.css';
import { Kurs as Kurstype, Omfang, Omfangenhet } from 'felles/domene/kandidat/Cv';
import Kort from '../kort/Kort';
import sortByDato from '../tidsperiode/sortByDato';
import Erfaring from './erfaring/Erfaring';
import { BodyShort } from '@navikt/ds-react';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Kurs = ({ cv }: Props) => {
    return cv.kurs?.length > 0 ? (
        <Kort overskrift={'Kurs'} ikon={<ClipboardIcon />}>
            <div className={css.erfaringer}>
                {sortByDato(cv.kurs).map((kurs) => (
                    <Erfaring
                        key={`${kurs.tittel}-${kurs.fraDato}`}
                        overskrift={kurs.tittel}
                        beskrivelse={null}
                        tidsperiode={visTidsperiode(kurs)}
                    />
                ))}
            </div>
        </Kort>
    ) : null;
};

const visTidsperiode = (kurs: Kurstype) => {
    if (kurs.fraDato && kurs.omfang.enhet.length > 0 && kurs.omfang.verdi > 0) {
        return (
            <div className={css.tidsperiode}>
                <BodyShort size="small" className={css.tekst}>
                    Fullført {formaterDatoHvisIkkeNull(kurs.fraDato)}
                </BodyShort>
                <BodyShort size="small" className={css.tekst}>
                    {hentKursvarighet(kurs.omfang)}
                </BodyShort>
            </div>
        );
    } else if (kurs.fraDato && (kurs.omfang.enhet.length === 0 || kurs.omfang.verdi === 0)) {
        return (
            <BodyShort size="small" className={css.tekst}>
                Fullført {formaterDatoHvisIkkeNull(kurs.fraDato)}
            </BodyShort>
        );
    } else if (!kurs.fraDato && kurs.omfang.enhet.length > 0 && kurs.omfang.verdi > 0) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {hentKursvarighet(kurs.omfang)}
            </BodyShort>
        );
    } else {
        return null;
    }
};

const hentKursvarighet = (omfang: Omfang) => {
    switch (omfang.enhet) {
        case Omfangenhet.Time:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'timer' : 'time'}`;
        case Omfangenhet.Dag:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'dager' : 'dag'}`;
        case Omfangenhet.Uke:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'uker' : 'uke'}`;
        case Omfangenhet.Måned:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'måneder' : 'måned'}`;
        default:
            return '';
    }
};

export default Kurs;
