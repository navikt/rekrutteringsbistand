import css from './Erfaringer.module.css';
import Erfaring from '../erfaring/Erfaring';
import { Buldings2Icon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import CvType from '../../cv/reducer/cv-typer';
import Tidsperiode from '../tidsperiode/Tidsperiode';

type Props = {
    cv: CvType;
};
const Erfaringer = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Erfaring'}
            ikon={<Buldings2Icon />}
            innhold={
                <div className={css.erfaringer}>
                    {cv.yrkeserfaring?.length > 0 &&
                        cv.yrkeserfaring.map((erfaring) => {
                            let stillingstittel,
                                beskrivelse = '';

                            if (erfaring.alternativStillingstittel) {
                                stillingstittel = erfaring.alternativStillingstittel;
                            } else if (erfaring.styrkKodeStillingstittel) {
                                stillingstittel = erfaring.styrkKodeStillingstittel;
                            }

                            if (erfaring.beskrivelse) {
                                beskrivelse = erfaring.beskrivelse;
                            } else {
                                beskrivelse = '-';
                            }

                            return (
                                <Erfaring
                                    overskrift={stillingstittel}
                                    beskrivelse={beskrivelse}
                                    tidsperiode={<Tidsperiode />}
                                />
                            );
                        })}
                    <Erfaring
                        overskrift={'en overskrift'}
                        beskrivelse={'en beskrivelse'}
                        tidsperiode={<Tidsperiode />}
                    />
                    <div className={css.deler} />
                    <Erfaring
                        overskrift={'en ny overskrift'}
                        beskrivelse={'en ny beskrivelse'}
                        tidsperiode={<Tidsperiode />}
                    />
                </div>
            }
        />
    );
};

export default Erfaringer;
