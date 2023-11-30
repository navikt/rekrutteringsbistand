import { Radio, RadioGroup } from '@navikt/ds-react';
import { Søkekriterier } from '../reducer/listeoversiktReducer';
import css from './Filter.module.css';

enum Eierskapsfilter {
    KunMine = 'KUN_MINE',
    AlleSine = 'ALLE_SINE',
}

export enum Stillingsfilter {
    UtenStilling = 'UTEN_STILLING',
}

type Props = {
    søkekriterier: Søkekriterier;
    onVisMineKandidatlister: () => void;
    onVisAlleKandidatlister: () => void;
    className?: string;
};

const Filter = ({
    søkekriterier,
    onVisMineKandidatlister,
    onVisAlleKandidatlister,
    className,
}: Props) => {
    const handleEierskapsfilterChange = (eierskap: Eierskapsfilter) => {
        if (eierskap === Eierskapsfilter.KunMine) {
            onVisMineKandidatlister();
        } else {
            onVisAlleKandidatlister();
        }
    };

    const eierskapsfilter: Eierskapsfilter = søkekriterier.kunEgne
        ? Eierskapsfilter.KunMine
        : Eierskapsfilter.AlleSine;

    return (
        <div className={css.innhold}>
            <RadioGroup
                hideLegend
                legend="Eierskap"
                onChange={handleEierskapsfilterChange}
                value={eierskapsfilter}
            >
                <Radio value={Eierskapsfilter.KunMine}>Vis kun mine</Radio>
                <Radio value={Eierskapsfilter.AlleSine}>Vis alle sine</Radio>
            </RadioGroup>
        </div>
    );
};

export default Filter;
