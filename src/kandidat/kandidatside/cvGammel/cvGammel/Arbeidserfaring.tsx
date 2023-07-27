import { FunctionComponent } from 'react';
import Tidsperiode from '../tidsperiode/Tidsperiode';
import { Yrkeserfaring } from '../reducer/cv-typer';
import { BodyShort } from '@navikt/ds-react';
import css from './Cv.module.css';

type Props = { arbeidserfaring: Yrkeserfaring };

const Arbeidserfaring: FunctionComponent<Props> = ({ arbeidserfaring }) => {
    let arbeidsgiverOgSted = '',
        stillingstittel = '';

    if (arbeidserfaring.arbeidsgiver && arbeidserfaring.sted) {
        arbeidsgiverOgSted = `${arbeidserfaring.arbeidsgiver} | ${arbeidserfaring.sted}`;
    } else if (arbeidserfaring.arbeidsgiver) {
        arbeidsgiverOgSted = arbeidserfaring.arbeidsgiver;
    } else if (arbeidserfaring.sted) {
        arbeidsgiverOgSted = arbeidserfaring.sted;
    }

    if (arbeidserfaring.alternativStillingstittel) {
        stillingstittel = arbeidserfaring.alternativStillingstittel;
    } else if (arbeidserfaring.styrkKodeStillingstittel) {
        stillingstittel = arbeidserfaring.styrkKodeStillingstittel;
    }

    return (
        <div className={css.erfaring}>
            <BodyShort size="small" className={css.uthevet}>
                {stillingstittel} {arbeidsgiverOgSted}
            </BodyShort>
            <BodyShort size="small" className={css.tidsperiode}>
                <Tidsperiode
                    fradato={arbeidserfaring.fraDato}
                    tildato={arbeidserfaring.tilDato}
                    navarende={!arbeidserfaring.tilDato}
                />
            </BodyShort>
            {arbeidserfaring.beskrivelse ? (
                <BodyShort size="small" className={css.beskrivelse}>
                    {arbeidserfaring.beskrivelse}
                </BodyShort>
            ) : (
                <BodyShort size="small" className={css.beskrivelse}>
                    -
                </BodyShort>
            )}
        </div>
    );
};

export default Arbeidserfaring;
