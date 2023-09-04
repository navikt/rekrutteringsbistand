import { Button, TextField } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
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

    const handleLeggTilClick = () => {
        const feilmelding = validerEpostadresse(input);

        setFeilmelding(feilmelding);

        if (feilmelding === undefined) {
            onLeggTil(input);
            setInput('');
        }
    };

    return (
        <div className={css.leggTilEpostadresse}>
            <TextField
                type="email"
                label="E-posten til arbeidsgiveren"
                description="For eksempel: kari.nordmann@firma.no"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                error={feilmelding}
            />
            <Button onClick={handleLeggTilClick}>Legg til</Button>
        </div>
    );
};

const validerEpostadresse = (adresse: string): string | undefined => {
    if (adresse.trim() === '') {
        return 'Feltet er påkrevd';
    } else if (!erGyldigEpost(adresse.trim())) {
        return 'Oppgi en gyldig e-postadresse';
    } else if (inneholderSærnorskeBokstaver(adresse.trim())) {
        return 'Særnorske bokstaver i e-postadresse støttes ikke';
    }

    return undefined;
};

export default LeggTilEpostadresse;
