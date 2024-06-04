import NAVSPA from '@navikt/navspa';
import * as React from 'react';
import { erIkkeProd } from '../miljø';
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

const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
    });
};

const loadStylesheet = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
};

const devUrl = {
    script: 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js',
    css: 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css',
};

const prodUrl = {
    script: 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js',
    css: 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/index.css',
};

const Modiadekoratør: React.FC<IModiadekoratør> = ({ children }) => {
    React.useEffect(() => {
        Promise.all([
            loadScript(erIkkeProd ? devUrl.script : prodUrl.script),
            loadStylesheet(erIkkeProd ? devUrl.css : prodUrl.css),
        ]).catch((error) => console.log(error));
    }, []);

    return (
        <React.Fragment>
            <InternflateDecorator {...decoratorConfig} /> {children}
        </React.Fragment>
    );
};

export default Modiadekoratør;
