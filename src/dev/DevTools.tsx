import { BodyShort } from '@navikt/ds-react';
import DevMockModal from './DevMockModal';

const DevTools = () => {
    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: '#EFF0F2',
                border: 'solid black 5px',
                padding: '2px 10px 2px 10px',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <div
                style={{
                    color: '#3F3732',
                    fontWeight: 'bold',
                }}
            >
                <span style={{}}> DevToolZ: </span>
            </div>
            <DevMockModal />
            <BodyShort>ID: {localStorage.getItem('mockNavIdent')}</BodyShort> Roller:{' '}
            {localStorage.getItem('mockRoller')}
        </div>
    );
};

export default DevTools;
