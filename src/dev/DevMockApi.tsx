import { Checkbox, CopyButton, HelpText } from '@navikt/ds-react';
import { HttpHandler } from 'msw';
import * as React from 'react';
import { useIndexedDBDevToggle } from './useIndexedDB';

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
    mockApi?: HttpHandler[];
}

const DevMockApi: React.FC<IDevMockApi> = ({ navn, mockApi }) => {
    const { state, toggle } = useIndexedDBDevToggle(navn);

    return (
        <div style={{ display: 'flex' }}>
            <Checkbox value={navn} checked={state} onChange={toggle}>
                {navn}
            </Checkbox>
            {mockApi && visApiMedHelper(navn, mockApi)}
        </div>
    );
};

export default DevMockApi;
