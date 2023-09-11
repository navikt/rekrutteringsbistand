import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
import { ChangeEvent, useEffect, useState } from 'react';
import css from './LeggTilEpostadresse.module.css';
import { erGyldigEpost, inneholderSærnorskeBokstaver } from './epostValidering';

type Props = {
    onLeggTil: (adresse: string) => void;
    onFjern: (adresse: string) => void;
    feilmelding: string | undefined;
    valgteEposter: string[];
};

const LeggTilEpostadresse = ({ onLeggTil, onFjern, valgteEposter, feilmelding: feil }: Props) => {
    const [input, setInput] = useState<string>('');
    const [inputErGyldig, setInputErGyldig] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(feil);

    useEffect(() => {
        setFeilmelding(feil);
    }, [feil]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value;

        if (value) {
            setInput(value);
            setInputErGyldig(validerEpostadresse(value) === undefined);
        } else {
            setInput('');
        }
    };

    const handleToggle = (adresse: string, harBlittValgt: boolean) => {
        if (harBlittValgt) {
            onLeggTil(adresse);
            setInputErGyldig(false);
            setInput('');
        } else {
            onFjern(adresse);
        }
    };

    const handleClear = () => {
        setInputErGyldig(false);
        setInput('');
    };

    return (
        <Combobox
            isMultiSelect
            value={input}
            allowNewValues={inputErGyldig}
            className={css.leggTilEpostadresse}
            label="E-posten til arbeidsgiveren"
            description="For eksempel «kari.nordmann@firma.no». Særnorske bokstaver støttes ikke."
            onChange={handleChange}
            onClear={handleClear}
            selectedOptions={valgteEposter}
            onToggleSelected={handleToggle}
            toggleListButton={false}
            filteredOptions={[]}
            options={[]}
            error={feilmelding}
        />
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
