import CvType from '../reducer/cv-typer';
import { BagdeIcon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';

type Props = {
    cv: CvType;
};

const Fagbrev = ({ cv }: Props) => {
    const autorisasjoner = cv.fagdokumentasjon?.filter((f) => f.type !== 'Autorisasjon') ?? [];

    return (
        <Kort
            overskrift={'Fagbrev/svennebrev og mesterbrev'}
            ikon={<BagdeIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {autorisasjoner?.length > 0 &&
                        autorisasjoner.map(({ tittel }) => {
                            return (
                                <Erfaring
                                    key={`${tittel}`}
                                    overskrift={tittel}
                                    beskrivelse={null}
                                    tidsperiode={null}
                                />
                            );
                        })}
                </div>
            }
        />
    );
};

export default Fagbrev;
