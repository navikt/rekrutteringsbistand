import { Buldings2Icon } from '@navikt/aksel-icons';
import Erfaring from './erfaring/Erfaring';
import Kort from './kort/Kort';
import Tidsperiode from './Tidsperiode';
import css from './Cv.module.css';
import sortByDato from './sortByDato';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Erfaringer = ({ cv }: Props) => {
    return cv.yrkeserfaring?.length > 0 || cv.annenErfaring?.length > 0 ? (
        <Kort overskrift={'Erfaring'} ikon={<Buldings2Icon />}>
            <div className={css.erfaringer}>
                {cv.yrkeserfaring?.length > 0 &&
                    sortByDato(cv.yrkeserfaring).map((erfaring) => {
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
                                key={`${erfaring.styrkKode}-${erfaring.fraDato}`}
                                overskrift={stillingstittel}
                                beskrivelse={beskrivelse}
                                tidsperiode={
                                    <Tidsperiode
                                        fradato={erfaring.fraDato}
                                        tildato={erfaring.tilDato}
                                        nåværende={!erfaring.tilDato}
                                    />
                                }
                            />
                        );
                    })}
                {cv.yrkeserfaring?.length > 0 && cv.annenErfaring?.length > 0 ? (
                    <div className={css.deler} />
                ) : null}
                {cv.annenErfaring?.length > 0 &&
                    sortByDato(cv.annenErfaring).map((erfaring) => {
                        let beskrivelse = '';
                        if (erfaring.beskrivelse) {
                            beskrivelse = erfaring.beskrivelse;
                        } else {
                            beskrivelse = '-';
                        }

                        return (
                            <Erfaring
                                key={`${erfaring.rolle}-${erfaring.fraDato}`}
                                overskrift={erfaring.rolle}
                                beskrivelse={beskrivelse}
                                tidsperiode={
                                    <Tidsperiode
                                        fradato={erfaring.fraDato}
                                        tildato={erfaring.tilDato}
                                        nåværende={!erfaring.tilDato}
                                    />
                                }
                            />
                        );
                    })}
            </div>
        </Kort>
    ) : null;
};

export default Erfaringer;
