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

const loadResource = (
    tag: 'script' | 'link',
    attributes: Record<string, string>
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        element.onload = () => resolve(true);
        element.onerror = () =>
            reject(new Error(`Failed to load the resource: ${attributes.href || attributes.src}`));
        document.head.appendChild(element);
    });
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

    const assetUrls = erIkkeProd ? devUrl : prodUrl;

    React.useEffect(() => {
        Promise.all([
            loadResource('script', { src: assetUrls.script }),
            loadResource('link', { rel: 'stylesheet', href: assetUrls.css }),
        ])
            .then(() => setAssetsLoaded(true))
            .catch((error) => console.error('Error loading resources:', error));
    }, [assetUrls]);

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
