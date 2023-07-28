import { CarIcon } from '@navikt/aksel-icons';
import CvTyper, { Sertifikat as SertifikatType } from '../reducer/cv-typer';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import sortByDato from '../tidsperiode/sortByDato';
import Erfaring from './erfaring/Erfaring';

type Props = {
    cv: CvTyper;
};

const Førerkort = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Førerkort'}
            ikon={<CarIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {cv.forerkort?.length > 0 &&
                        fjernDuplikater(sortByDato(cv.forerkort)).map((førerkort) => (
                            <Erfaring
                                key={`${førerkort.sertifikatKode}-${førerkort.fraDato}`}
                                overskrift={
                                    førerkort.alternativtNavn
                                        ? førerkort.alternativtNavn
                                        : førerkort.sertifikatKodeNavn
                                }
                                beskrivelse={førerkort.sertifikatKode}
                                tidsperiode={null}
                            />
                        ))}
                </div>
            }
        />
    );
};

const fjernDuplikater = (forerkortListe: SertifikatType[]) => {
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
