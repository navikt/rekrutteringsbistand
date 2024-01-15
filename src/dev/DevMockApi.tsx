import { Checkbox, CopyButton, HelpText } from '@navikt/ds-react';
import { HttpHandler } from 'msw';
import * as React from 'react';
import { useLocalStorageToggle } from './DevUtil';

const visApiMedHelper = (navn: string, handler: HttpHandler[]) => {
    return (
        <div style={{ display: 'flex', marginRight: '2rem' }}>
            <HelpText title={navn}>
                <ul>
                    {handler?.flatMap((e, index) => (
                        <li key={index}>
                            ({index + 1}) {e?.info?.path.toString()}
                            <CopyButton copyText={e?.info?.path.toString()} />
                        </li>
                    ))}
                </ul>
            </HelpText>
        </div>
    );
};

export interface IDevMockApi {
    navn: string;
    setAktiv: (navn: string, aktiv: boolean) => void;
    mockApi?: HttpHandler[];
}

const DevMockApi: React.FC<IDevMockApi> = ({ navn, setAktiv, mockApi }) => {
    const [mockAktiv, toggleMockAktiv] = useLocalStorageToggle(navn);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAktiv(navn, !mockAktiv);
        toggleMockAktiv(e);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Checkbox value={navn} checked={mockAktiv} onChange={handleChange}>
                {navn}
            </Checkbox>
            {mockApi && visApiMedHelper(navn, mockApi)}
        </div>
    );
};

export default DevMockApi;
