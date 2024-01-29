import * as React from 'react';
import App from '../App';
import DevMockModal from './DevMockModal';

interface IDevTools {
    children?: React.ReactNode | undefined;
}

const DevTools: React.FC<IDevTools> = ({ children }) => {
    return (
        <>
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
            </div>
            <App />
        </>
    );
};

export default DevTools;
