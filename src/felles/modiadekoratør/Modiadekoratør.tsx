import { Loader } from '@navikt/ds-react';
import NAVSPA from '@navikt/navspa';
import * as React from 'react';
import { erIkkeProd } from '../miljø';
import { DecoratorProps } from './ModiadekoratørTyper';

export interface IModiadekoratør {
    children?: React.ReactNode | undefined;
}

const decoratorConfig: DecoratorProps = {
    appName: 'Rekrutteringsbistand',
    showEnheter: true,
    showSearchArea: true,
    showHotkeys: true,
    environment: erIkkeProd ? 'q1' : 'prod',
    urlFormat: erIkkeProd ? 'LOCAL' : 'ANSATT',
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
    return Promise.resolve(true);
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
    const [assetsLoaded, setAssetsLoaded] = React.useState(false);

    React.useEffect(() => {
        Promise.all([
            loadScript(erIkkeProd ? devUrl.script : prodUrl.script),
            loadStylesheet(erIkkeProd ? devUrl.css : prodUrl.css),
        ])
            .then(() => setAssetsLoaded(true))
            .catch((error) => console.log(error));
    }, []);

    if (!assetsLoaded) {
        return <Loader />; // or return a loading spinner
    }

    const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

    return (
        <React.Fragment>
            <InternflateDecorator {...decoratorConfig} /> {children}
        </React.Fragment>
    );
};

export default Modiadekoratør;
