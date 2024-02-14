import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { FunctionComponent, useMemo, useState } from 'react';
import { Søkekriterier } from '../../hooks/useSøkekriterier';
import Merkelapp from '../merkelapp/Merkelapp';
import Merkelapper from '../merkelapp/Merkelapper';
import css from './Kompetanse.module.css';
import {
    KompetanseforslagProps,
    useKompetanseforslag,
} from '../../../api/kandidat-søk-api/kompetanseforslag';

type Props = {
    søkekriterier: Søkekriterier;
    onVelgForslag: (forslag: string) => () => void;
};

const uinteressanteForslag = ['Fagbrev/svennebrev', 'Mesterbrev', 'Autorisasjon'];

const ForslagBasertPåYrke: FunctionComponent<Props> = ({ søkekriterier, onVelgForslag }) => {
    const yrker: KompetanseforslagProps[] = Array.from(søkekriterier.ønsketYrke).map((yrke) => ({
        yrke,
    }));

    const { kompetanseforslag } = useKompetanseforslag(yrker);

    const [visAlleForslag, setVisAlleForslag] = useState<boolean>(false);

    const alleForslag = useMemo(
        () => kompetanseforslag?.kompetanser?.map((k) => k.key),
        [kompetanseforslag]
    );
    const interessanteForslag = useMemo(
        () => alleForslag.filter((forslag) => !uinteressanteForslag.includes(forslag)),
        [alleForslag]
    );
    const uvalgteForslag = useMemo(
        () => interessanteForslag.filter((kompetanse) => !søkekriterier.kompetanse.has(kompetanse)),
        [interessanteForslag, søkekriterier.kompetanse]
    );

    const forslag = useMemo(
        () => (visAlleForslag ? uvalgteForslag : uvalgteForslag.slice(0, 4)),
        [uvalgteForslag, visAlleForslag]
    );

    if (!kompetanseforslag || søkekriterier.ønsketYrke.size === 0 || forslag.length === 0) {
        return null;
    }

    return (
        <div className={css.forslag}>
            <Heading size="xsmall" level="4">
                Forslag til kompetanse
            </Heading>
            <BodyShort size="small" className={css.beskrivelse}>
                Basert på ønsket yrke ({visYrker(søkekriterier.ønsketYrke)})
            </BodyShort>
            <Merkelapper>
                {forslag.map((kompetanse) => (
                    <Merkelapp
                        variant="oransje"
                        ariaLabel={`Legg til ${kompetanse}`}
                        // @ts-ignore TODO: written before strict-mode enabled
                        onClick={onVelgForslag(kompetanse)}
                        key={kompetanse}
                    >
                        {kompetanse}
                    </Merkelapp>
                ))}
            </Merkelapper>
            {uvalgteForslag.length > 4 && (
                <Button
                    size="small"
                    className={css.visningsknapp}
                    onClick={() => setVisAlleForslag(!visAlleForslag)}
                    icon={visAlleForslag ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    variant="tertiary"
                >
                    {visAlleForslag ? 'Vis færre' : `Vis alle (${uvalgteForslag.length})`}
                </Button>
            )}
        </div>
    );
};

const visYrker = (ønskedeYrker: Set<string>) => {
    const somArray = Array.from(ønskedeYrker);
    const maksTreYrker = somArray.slice(0, 3);
    const iSmåBokstaver = maksTreYrker.map((yrke) => yrke.toLowerCase());
    const somEnString = iSmåBokstaver.join(', ');

    return somArray.length > 3 ? `${somEnString}, ...` : somEnString;
};

export default ForslagBasertPåYrke;
