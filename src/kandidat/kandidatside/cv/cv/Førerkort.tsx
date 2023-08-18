import { CarIcon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import sortByDato from '../tidsperiode/sortByDato';
import Erfaring from './erfaring/Erfaring';
import { BodyShort } from '@navikt/ds-react';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import { Sertifikat } from 'felles/domene/kandidat/Cv';

type Props = {
    cv: KandidatCv;
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
                        tidsperiode={<FørerkortTidsperiode førerkort={førerkort} />}
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
