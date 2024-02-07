import { Chips } from '@navikt/ds-react';
import * as React from 'react';

export interface IDevRoller {
    children?: React.ReactNode | undefined;
}

const roller = ['Moda generell', 'Arbeidsgiverrettet', 'Jobsøkerrettet', 'Utvikler'];
const DevRoller: React.FC<IDevRoller> = () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
        <Chips>
            {roller.map((c) => (
                <Chips.Toggle
                    selected={selected.includes(c)}
                    key={c}
                    onClick={() =>
                        setSelected(
                            selected.includes(c)
                                ? selected.filter((x) => x !== c)
                                : [...selected, c]
                        )
                    }
                >
                    {c}
                </Chips.Toggle>
            ))}
        </Chips>
    );
};

export default DevRoller;
