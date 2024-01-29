import { TextField } from '@navikt/ds-react';
import fnrValidator from '@navikt/fnrvalidator';
import * as React from 'react';

export interface IFødselsnummerTekstfelt {
    initFnr?: string;
    callBack: (fødselsnummer: string | null) => void;
}

const validerFnr = (fnr: string): boolean => fnrValidator.idnr(fnr).status === 'valid';

const FødselsnummerTekstfelt: React.FC<IFødselsnummerTekstfelt> = ({ callBack, initFnr }) => {
    const [fnr, setFnr] = React.useState<string>(initFnr || '');
    const [feilmelding, setFeilmelding] = React.useState<string>();

    const handleFnrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fødselsnummer = event.target.value;

        setFnr(fødselsnummer);

        if (fødselsnummer.length < 11) {
            setFeilmelding('');
            callBack(null);
        } else if (fødselsnummer.length > 11) {
            setFeilmelding('Fødselsnummeret er for langt');
            callBack(null);
        } else {
            const erGyldig = validerFnr(fødselsnummer);
            if (erGyldig) {
                setFeilmelding('');
                callBack(fødselsnummer);
            } else {
                callBack(null);
                setFeilmelding('Fødselsnummeret er ikke gyldig');
            }
        }
    };

    return (
        <TextField
            style={{ maxWidth: '10rem' }}
            autoFocus
            value={fnr}
            size="medium"
            id="legg-til-kandidat-fnr"
            onChange={handleFnrChange}
            placeholder="11 siffer"
            // className={css.input}
            label="Fødselsnummer på kandidaten"
            error={feilmelding}
        />
    );
};

export default FødselsnummerTekstfelt;
