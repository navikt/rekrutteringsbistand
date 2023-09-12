import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Erfaringsdetaljer from './erfaring/Erfaringsdetaljer';
import Kort from './kort/Kort';
import sortByDato from './sortByDato';

type Props = {
    cv: Kandidat;
};

const Utdanning = ({ cv }: Props) => {
    return cv.utdanning?.length > 0 ? (
        <Kort overskrift={'Utdanning'} ikon={<CheckmarkCircleIcon />}>
            <div className={css.erfaringer}>
                {sortByDato(cv.utdanning).map((utdanning) => {
                    return (
                        <Erfaring
                            key={`${utdanning.nusKode}${utdanning.fraDato}`}
                            overskrift={
                                utdanning.alternativGrad
                                    ? utdanning.alternativGrad
                                    : utdanning.beskrivelse +
                                      (utdanning.utdannelsessted
                                          ? ', ' + utdanning.utdannelsessted
                                          : '')
                            }
                            beskrivelse={utdanning.beskrivelse}
                            detaljer={
                                <Erfaringsdetaljer
                                    fradato={utdanning.fraDato}
                                    tildato={utdanning.tilDato}
                                    nåværende={!utdanning.tilDato}
                                    sted={utdanning.utdannelsessted}
                                />
                            }
                        />
                    );
                })}
            </div>
        </Kort>
    ) : null;
};

export default Utdanning;
