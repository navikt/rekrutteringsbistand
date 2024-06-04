import NAVSPA from '@navikt/navspa';
import * as React from 'react';
import { DecoratorProps } from './ModiadekoratørTyper';

export interface IModiadekoratør {
    children?: React.ReactNode | undefined;
}
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const decoratorConfig: DecoratorProps = {
    appName: 'Rekrutteringsbistand',
    showEnheter: true,
    showSearchArea: true,
    showHotkeys: true,
    environment: 'local',
    urlFormat: 'LOCAL',
    useProxy: true,

    onEnhetChanged(enhet) {
        console.log('Enhet endret til enhet:', enhet);
    },
    onFnrChanged(_) {
        console.log('🎺 "fnr change"');
    },
};

const Modiadekoratør: React.FC<IModiadekoratør> = ({ children }) => {
    return (
        <React.Fragment>
            <InternflateDecorator {...decoratorConfig} /> {children}
        </React.Fragment>
    );
};

export default Modiadekoratør;
