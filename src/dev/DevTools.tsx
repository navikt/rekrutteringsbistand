import * as React from 'react';
import App from '../App';
import DevMockModal from './DevMockModal';

interface IDevTools {
    children?: React.ReactNode | undefined;
}

const DevTools: React.FC<IDevTools> = ({ children }) => {
    return (
        <>
            <div style={{ display: 'flex', alignContent: 'baseline' }}>
                <div
                    style={{
                        backgroundColor: '#3B352F',
                        color: 'white',
                        padding: '0 1rem 0 1rem',
                    }}
                >
                    <strong> DevToolZ </strong>
                </div>
                <DevMockModal />
            </div>
            <App />
        </>
    );
};

export default DevTools;
