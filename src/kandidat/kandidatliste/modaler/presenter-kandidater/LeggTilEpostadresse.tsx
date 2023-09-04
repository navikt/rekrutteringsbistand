import { Button, TextField } from '@navikt/ds-react';
import { MouseEvent, useEffect, useState } from 'react';
import css from './LeggTilEpostadresse.module.css';
import { erGyldigEpost, inneholderSærnorskeBokstaver } from './epostValidering';

type Props = {
    onLeggTil: (adresse: string) => void;
    feilmelding: string | undefined;
};

const LeggTilEpostadresse = ({ onLeggTil, feilmelding: feil }: Props) => {
    const [input, setInput] = useState<string>('');
    const [feilmelding, setFeilmelding] = useState<string | undefined>(feil);

    useEffect(() => {
        setFeilmelding(feil);
    }, [feil]);

    const handleLeggTilClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const feilmelding = validerEpostadresse(input);

        setFeilmelding(feilmelding);

        if (feilmelding === undefined) {
            onLeggTil(input);
            setInput('');
        }
    };

    return (
        <form className={css.leggTilEpostadresse}>
            <TextField
                type="email"
                label="E-posten til arbeidsgiveren"
                description="For eksempel: kari.nordmann@firma.no"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                error={feilmelding}
            />
            <Button type="submit" onClick={handleLeggTilClick}>
                Legg til
            </Button>
        </form>
    );
};

const validerEpostadresse = (adresse: string): string | undefined => {
    const trimmet = adresse.trim();

    if (trimmet.length === 0 || !erGyldigEpost(trimmet)) {
        return 'Oppgi en gyldig e-postadresse';
    } else if (inneholderSærnorskeBokstaver(adresse.trim())) {
        return 'Særnorske bokstaver i e-postadresse støttes ikke';
    }

    return undefined;
};

export default LeggTilEpostadresse;
