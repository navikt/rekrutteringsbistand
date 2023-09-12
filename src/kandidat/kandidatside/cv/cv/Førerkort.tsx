import { CarIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { Sertifikat } from 'felles/domene/kandidat/Cv';
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
                        key={`${førerkort.sertifikatKode}-${førerkort.fraDato}`}
                        overskrift={
                            førerkort.alternativtNavn
                                ? førerkort.alternativtNavn
                                : førerkort.sertifikatKodeNavn
                        }
                        beskrivelse={førerkort.sertifikatKode}
                        detaljer={<FørerkortTidsperiode førerkort={førerkort} />}
                    />
                ))}
            </div>
        </Kort>
    ) : null;
};

const FørerkortTidsperiode = ({ førerkort }: { førerkort: Sertifikat }) => {
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

const fjernDuplikater = (forerkortListe: Sertifikat[]) => {
    const forerkortAlleredeILista = new Set();

    return forerkortListe.filter((forerkort) => {
        const forerkortetErIkkeAlleredeLagtTil = !forerkortAlleredeILista.has(
            forerkort.sertifikatKodeNavn
        );

        forerkortAlleredeILista.add(forerkort.sertifikatKodeNavn);
        return forerkortetErIkkeAlleredeLagtTil;
    });
};

export default Førerkort;
