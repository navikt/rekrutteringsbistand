import Kort from '../kort/Kort';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import css from './Cv.module.css';
import sortByDato from '../tidsperiode/sortByDato';
import Erfaring from './erfaring/Erfaring';
import Tidsperiode from '../tidsperiode/Tidsperiode';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Utdanning = ({ cv }: Props) => {
    return cv.utdanning?.length > 0 ? (
        <Kort
            overskrift={'Utdanning'}
            ikon={<CheckmarkCircleIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {sortByDato(cv.utdanning).map((utdanning) => {
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
    ) : null;
};

export default Utdanning;
