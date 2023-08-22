import { Buldings2Icon } from '@navikt/aksel-icons';
import { AnnenErfaring, Yrkeserfaring } from 'felles/domene/kandidat/Cv';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Erfaringsdetaljer from './erfaring/Erfaringsdetaljer';
import Kort from './kort/Kort';
import sortByDato from './sortByDato';

type Props = {
    cv: KandidatCv;
};

const Erfaringer = ({ cv }: Props) => {
    return cv.yrkeserfaring?.length > 0 || cv.annenErfaring?.length > 0 ? (
        <Kort overskrift={'Erfaring'} ikon={<Buldings2Icon />}>
            <div className={css.erfaringer}>
                {cv.yrkeserfaring?.length > 0 &&
                    sortByDato(cv.yrkeserfaring).map((erfaring) => (
                        <Erfaring
                            key={`${erfaring.styrkKode}-${erfaring.fraDato}`}
                            overskrift={hentStillingstittel(erfaring)}
                            beskrivelse={hentBeskrivelse(erfaring)}
                            detaljer={
                                <Erfaringsdetaljer
                                    fradato={erfaring.fraDato}
                                    tildato={erfaring.tilDato}
                                    nåværende={!erfaring.tilDato}
                                    sted={hentSted(erfaring)}
                                />
                            }
                        />
                    ))}

                {cv.yrkeserfaring?.length > 0 && cv.annenErfaring?.length > 0 ? (
                    <div className={css.deler} />
                ) : null}

                {cv.annenErfaring?.length > 0 &&
                    sortByDato(cv.annenErfaring).map((erfaring) => {
                        return (
                            <Erfaring
                                key={`${erfaring.rolle}-${erfaring.fraDato}`}
                                overskrift={erfaring.rolle}
                                beskrivelse={hentBeskrivelse(erfaring)}
                                detaljer={
                                    <Erfaringsdetaljer
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

const hentSted = (erfaring: Yrkeserfaring) => {
    if (erfaring.arbeidsgiver && erfaring.sted) {
        return `${erfaring.arbeidsgiver} | ${erfaring.sted}`;
    } else if (erfaring.arbeidsgiver) {
        return erfaring.arbeidsgiver;
    } else if (erfaring.sted) {
        return erfaring.sted;
    }
};

const hentStillingstittel = (erfaring: Yrkeserfaring) => {
    if (erfaring.alternativStillingstittel) {
        return erfaring.alternativStillingstittel;
    } else if (erfaring.styrkKodeStillingstittel) {
        return erfaring.styrkKodeStillingstittel;
    }
};

const hentBeskrivelse = (erfaring: Yrkeserfaring | AnnenErfaring) => {
    if (erfaring.beskrivelse) {
        return erfaring.beskrivelse;
    } else {
        return '-';
    }
};

export default Erfaringer;
