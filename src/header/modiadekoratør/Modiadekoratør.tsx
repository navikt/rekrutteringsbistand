import Navspa from '@navikt/navspa';
import { NavKontor } from 'felles/store/navKontor';
import loadjs from 'loadjs';
import { ComponentType, FunctionComponent, useEffect, useRef, useState } from 'react';
import DekoratørProps, { EnhetDisplay } from './DekoratørProps';
import css from './Modiadekoratør.module.css';

const appName = 'internarbeidsflatefs';

enum Status {
    LasterNed,
    Klar,
    Feil,
}

type Props = {
    navKontor: NavKontor | null;
    onNavKontorChange: (navKontor: NavKontor) => void;
};

const Modiadekoratør: FunctionComponent<Props> = ({ navKontor, onNavKontorChange }) => {
    const microfrontend = useRef<ComponentType<DekoratørProps>>();

    const [status, setStatus] = useState<Status>(
        loadjs.isDefined(appName) ? Status.Klar : Status.LasterNed
    );

    useEffect(() => {
        const loadAssets = async (staticPaths: string[]) => {
            try {
                await loadjs(staticPaths, appName, {
                    returnPromise: true,
                });

                const component = Navspa.importer<DekoratørProps>(appName);
                microfrontend.current = component;

                setStatus(Status.Klar);
            } catch (e) {
                setStatus(Status.Feil);
            }
        };

        if (!loadjs.isDefined(appName)) {
            let url = hentHostname();

            loadAssets([
                `${url}/internarbeidsflatedecorator/v2.1/static/js/head.v2.min.js`,
                `${url}/internarbeidsflatedecorator/v2.1/static/css/main.css`,
            ]);
        }
    }, []);

    const handleNavKontorChange = (enhetId: string) => {
        onNavKontorChange({
            enhetId,
            navn: hentNavKontoretsNavn(enhetId),
        });
    };

    return (
        <div className={css.wrapper}>
            {status === Status.Klar && (
                <microfrontend.current
                    appname="Rekrutteringsbistand"
                    useProxy={true}
                    enhet={{
                        initialValue: navKontor.enhetId,
                        display: EnhetDisplay.ENHET_VALG,
                        onChange: handleNavKontorChange,
                        ignoreWsEvents: true,
                    }}
                    toggles={{
                        visVeileder: true,
                    }}
                />
            )}

            {status === Status.Feil && <span>Klarte ikke å laste inn Modia-dekoratør</span>}
        </div>
    );
};

const hentHostname = () => {
    if (window.location.hostname.includes('intern.dev.nav.no')) {
        return 'https://internarbeidsflatedecorator-q0.intern.dev.nav.no';
    } else if (window.location.hostname.includes('intern.nav.no')) {
        return 'https://internarbeidsflatedecorator.intern.nav.no';
    } else {
        return 'https://navikt.github.io';
    }
};

const hentNavKontoretsNavn = (enhetId: string) => {
    let enhetElement = document.getElementsByClassName(
        'dekorator__hode__enhet'
    )[0] as HTMLSpanElement;

    if (!enhetElement) {
        const dropdownElement = document.getElementsByClassName('dekorator-select-container')[0];

        if (dropdownElement) {
            enhetElement = Array.from(dropdownElement.getElementsByTagName('option')).find(
                (enhet) => enhet.value === enhetId
            );
        }
    }

    if (enhetElement) {
        return enhetElement.innerText.slice(5);
    } else {
        return `Enhet ${enhetId}`;
    }
};

export default Modiadekoratør;
