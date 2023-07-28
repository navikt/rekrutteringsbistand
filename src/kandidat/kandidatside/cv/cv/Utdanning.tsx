import CvType from '../reducer/cv-typer';
import Kort from '../kort/Kort';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import css from './Cv.module.css';
import sortByDato from '../tidsperiode/sortByDato';
import Erfaring from './erfaring/Erfaring';
import Tidsperiode from '../tidsperiode/Tidsperiode';

type Props = {
    cv: CvType;
};

const Utdanning = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Utdanning'}
            ikon={<CheckmarkCircleIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {cv.utdanning?.length > 0 &&
                        sortByDato(cv.utdanning).map((utdanning) => {
                            return (
                                <Erfaring
                                    key={`${utdanning.nusKode}${utdanning.fraDato}`}
                                    overskrift={
                                        utdanning.alternativtUtdanningsnavn
                                            ? utdanning.alternativtUtdanningsnavn
                                            : utdanning.nusKodeUtdanningsnavn +
                                              (utdanning.utdannelsessted
                                                  ? ', ' + utdanning.utdannelsessted
                                                  : '')
                                    }
                                    beskrivelse={utdanning.beskrivelse}
                                    tidsperiode={
                                        <Tidsperiode
                                            fradato={utdanning.fraDato}
                                            tildato={utdanning.tilDato}
                                            nåværende={!utdanning.tilDato}
                                        />
                                    }
                                />
                            );
                        })}
                </div>
            }
        />
    );
};

export default Utdanning;
