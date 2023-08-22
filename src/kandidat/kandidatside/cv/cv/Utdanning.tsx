import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Detaljer from './erfaring/Erfaringsdetaljer';
import Kort from './kort/Kort';
import sortByDato from './sortByDato';

type Props = {
    cv: KandidatCv;
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
                                utdanning.alternativtUtdanningsnavn
                                    ? utdanning.alternativtUtdanningsnavn
                                    : utdanning.nusKodeUtdanningsnavn +
                                      (utdanning.utdannelsessted
                                          ? ', ' + utdanning.utdannelsessted
                                          : '')
                            }
                            beskrivelse={utdanning.beskrivelse}
                            detaljer={
                                <Detaljer
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
