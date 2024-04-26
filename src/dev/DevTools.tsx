import { BodyShort } from '@navikt/ds-react';
import DevMockModal from './DevMockModal';

import style from './DevTools.module.css';

const DevTools = () => {
    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: '#C5BEDE',
                padding: '2px 10px 2px 10px',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <div className={style.devToolsText}>
                <span style={{}}> DevToolZ </span>
            </div>
            <DevMockModal />
            <BodyShort>ID: {localStorage.getItem('mockNavIdent')}</BodyShort> Roller:{' '}
            {localStorage.getItem('mockRoller')}
        </div>
    );
};

export default DevTools;
