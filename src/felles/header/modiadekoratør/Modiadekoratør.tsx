import { Alert } from '@navikt/ds-react';
import NAVSPA from '@navikt/navspa';
import loadjs from 'loadjs';
import { ComponentType, FunctionComponent, useEffect, useRef, useState } from 'react';
import { NavKontorMedNavn } from '../../ApplikasjonContext';
import { getMiljø, Miljø } from '../../miljø';
import { DecoratorProps } from './DekoratørProps';

const appName = 'internarbeidsflate-decorator-v3';

enum Status {
    LasterNed,
    Klar,
    Feil,
}

type Props = {
    navKontor: string | null;
    onNavKontorChange: (navKontor: NavKontorMedNavn) => void;
};

const Modiadekoratør: FunctionComponent<Props> = ({ navKontor, onNavKontorChange }) => {
    const microfrontend = useRef<ComponentType<DecoratorProps>>();

    const [status, setStatus] = useState<Status>(
        loadjs.isDefined(appName) ? Status.Klar : Status.LasterNed
    );

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
          @import url('https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css')
          layer(modiadekorator);
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        const loadAssets = async (staticPaths: string[]) => {
            try {
                // Load JS bundle
                await loadjs(staticPaths, appName, {
                    returnPromise: true,
                });

                const component = NAVSPA.importer<DecoratorProps>(appName);
                microfrontend.current = component;

                setStatus(Status.Klar);
            } catch (e) {
                setStatus(Status.Feil);
            }
        };

        if (!loadjs.isDefined(appName)) {
            loadAssets([
                `https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js`,
            ]);
        }
    }, []);

    const handleNavKontorChange = (enhetId: string | null | undefined, enhet: any) => {
        onNavKontorChange({
            navKontor: enhet.enhetId,
            navKontorNavn: hentNavKontoretsNavn(enhet.navn),
        });
    };

    const proxyUrl =
        getMiljø() === Miljø.ProdGcp
            ? 'https://rekrutteringsbistand.intern.nav.no/modiacontextholder'
            : 'https://rekrutteringsbistand.intern.dev.nav.no/modiacontextholder';

    const props: DecoratorProps = {
        proxy: proxyUrl,
        urlFormat: 'NAV_NO',
        environment: 'q0',
        showEnheter: true,
        showHotkeys: false,
        showSearchArea: false,
        appName: 'Rekrutteringsbistand',
        useProxy: true,
        onEnhetChanged: handleNavKontorChange,
    };
    return (
        <>
            {status === Status.Klar &&
                (() => {
                    const MicrofrontendComponent =
                        microfrontend.current as React.ComponentType<any>;
                    return <MicrofrontendComponent {...props} />;
                })()}

            {status === Status.Feil && (
                <Alert variant="error">Klarte ikke å laste inn Modia-dekoratør</Alert>
            )}
        </>
    );
};

const hentNavKontoretsNavn = (navKontor: string) => {
    let enhetElement: HTMLSpanElement | undefined = document.getElementsByClassName(
        'dekorator__hode__enhet'
    )[0] as HTMLSpanElement;

    if (!enhetElement) {
        const dropdownElement = document.getElementsByClassName('dekorator-select-container')[0];

        if (dropdownElement) {
            enhetElement = Array.from(dropdownElement.getElementsByTagName('option')).find(
                (enhet) => enhet.value === navKontor
            );
        }
    }

    if (enhetElement) {
        return enhetElement.innerText.slice(5);
    } else {
        return null;
    }
};

export default Modiadekoratør;
