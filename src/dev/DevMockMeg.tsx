import { Chips, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Rolle } from '../felles/tilgangskontroll/Roller';

export interface IDevMockMeg {
    children?: React.ReactNode | undefined;
}

const roller = [
    Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    Rolle.AD_GRUPPE_MODIA_GENERELL_TILGANG,
    Rolle.AD_GRUPPE_MODIA_OPPFOLGING,
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
