import { Loader } from '@navikt/ds-react';
import NAVSPA from '@navikt/navspa';
import loadjs from 'loadjs';
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
    onEnhetChanged: (enhet) => {
        console.log('Enhet endret til enhet:', enhet);
    },
    onFnrChanged(_) {
        console.log();
    },
};

const devAssets = [
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js',
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css',
];

const prodAssets = [
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js',
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/index.css',
];

enum Status {
    Laster,
    Klar,
    Feil,
}

const dekoratørNavn = 'internarbeidsflatefs';

const Modiadekoratør: React.FC<IModiadekoratør> = ({ children }) => {
    const dekoratør = React.useRef<React.ComponentType<DecoratorProps>>();
    const assets = erIkkeProd ? devAssets : prodAssets;
    const [status, setStatus] = React.useState<Status>(
        loadjs.isDefined(dekoratørNavn) ? Status.Klar : Status.Laster
    );

    React.useEffect(() => {
        const loadAssets = async (staticPaths: string[]) => {
            try {
                await loadjs(staticPaths, dekoratørNavn, {
                    returnPromise: true,
                });

                const component = NAVSPA.importer<DecoratorProps>(dekoratørNavn);
                dekoratør.current = component;

                setStatus(Status.Klar);
            } catch (error) {
                console.error('Feil ved lasting av assets:', error);
                setStatus(Status.Feil);
            }
        };

        if (!loadjs.isDefined(dekoratørNavn)) {
            loadAssets(assets);
        }
    }, [assets]);

    if (status === Status.Laster) {
        return <Loader />;
    }

    if (dekoratør.current) {
        const DekoratørComponent = dekoratør.current;
        return (
            <React.Fragment>
                <DekoratørComponent {...decoratorConfig} /> {children}
            </React.Fragment>
        );
    }

    return <div>Feil ved lasting av Modia-dekoratør</div>;
};
export default Modiadekoratør;
