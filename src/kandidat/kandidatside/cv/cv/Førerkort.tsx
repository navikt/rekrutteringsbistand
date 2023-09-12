import { CarIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { Førerkort as FørerkortType } from 'felles/domene/kandidat/Cv';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Kort from './kort/Kort';
import sortByDato from './sortByDato';
import Kandidat from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: Kandidat;
};

const Førerkort = ({ cv }: Props) => {
    return cv.forerkort?.length > 0 ? (
        <Kort overskrift={'Førerkort'} ikon={<CarIcon />}>
            <div className={css.erfaringer}>
                {fjernDuplikater(sortByDato(cv.forerkort)).map((førerkort) => (
                    <Erfaring
                        key={`${førerkort.forerkortKode}-${førerkort.fraDato}`}
                        overskrift={
                            førerkort.alternativtNavn
                                ? førerkort.alternativtNavn
                                : førerkort.forerkortKodeKlasse
                        }
                        beskrivelse={førerkort.forerkortKode}
                        detaljer={<FørerkortTidsperiode førerkort={førerkort} />}
                    />
                ))}
            </div>
        </Kort>
    ) : null;
};

const FørerkortTidsperiode = ({ førerkort }: { førerkort: FørerkortType }) => {
    if (førerkort.fraDato && førerkort.tilDato) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {formaterDatoHvisIkkeNull(førerkort.fraDato)}
                {' – ' + formaterDatoHvisIkkeNull(førerkort.tilDato)}
            </BodyShort>
        );
    } else {
        return null;
    }
};

const fjernDuplikater = (forerkortListe: FørerkortType[]) => {
    const forerkortAlleredeILista = new Set();

    return forerkortListe.filter((forerkort) => {
        const forerkortetErIkkeAlleredeLagtTil = !forerkortAlleredeILista.has(
            forerkort.forerkortKodeKlasse
        );

        forerkortAlleredeILista.add(forerkort.forerkortKodeKlasse);
        return forerkortetErIkkeAlleredeLagtTil;
    });
};

export default Førerkort;
