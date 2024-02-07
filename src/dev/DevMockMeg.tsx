import { Chips, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Rolle } from '../api/frackend/meg';

export interface IDevMockMeg {
    children?: React.ReactNode | undefined;
}

const roller = [
    Rolle.UTVIKLER,
    Rolle.ARBEIDSGIVERRETTET,
    Rolle.JOBBSØKERRETTET,
    Rolle.MODIA_GENERELL,
];

const DevMockMeg: React.FC<IDevMockMeg> = () => {
    const [mockNavIdent, setMockNavIdent] = React.useState<string>(
        localStorage.getItem('mockNavIdent') ?? 'Z123456'
    );
    const [mockRoller, setMockRoller] = React.useState<Rolle[]>(
        JSON.parse(localStorage.getItem('mockRoller') ?? '[]')
    );

    React.useEffect(() => {
        localStorage.setItem('mockNavIdent', mockNavIdent);
    }, [mockNavIdent]);
    React.useEffect(() => {
        localStorage.setItem('mockRoller', JSON.stringify(mockRoller));
    }, [mockRoller]);

    return (
        <>
            <TextField
                value={mockNavIdent}
                label="NavIdent"
                size="small"
                style={{ marginBottom: '1rem' }}
                onChange={(e) => setMockNavIdent(e.target.value)}
            />

            <Chips>
                {roller.map((c) => (
                    <Chips.Toggle
                        selected={mockRoller.includes(c as Rolle)}
                        key={c}
                        onClick={() =>
                            setMockRoller(
                                mockRoller.includes(c as Rolle)
                                    ? mockRoller.filter((x) => x !== c)
                                    : ([...mockRoller, c] as Rolle[])
                            )
                        }
                    >
                        {c}
                    </Chips.Toggle>
                ))}
            </Chips>
        </>
    );
};

export default DevMockMeg;
