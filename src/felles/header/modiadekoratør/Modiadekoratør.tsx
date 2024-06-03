import Navspa from '@navikt/navspa';
import loadjs from 'loadjs';
import { ComponentType, FunctionComponent, useEffect, useRef, useState } from 'react';
import { NavKontorMedNavn } from '../../ApplikasjonContext';
import DekoratørProps, { EnhetDisplay } from './DekoratørProps';
import css from './Modiadekoratør.module.css';

const appName = 'internarbeidsflatefs';

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
            const url = hentHostname();

            loadAssets([
                `${url}/internarbeidsflatedecorator/v2.1/static/js/head.v2.min.js`,
                `${url}/internarbeidsflatedecorator/v2.1/static/css/main.css`,
            ]);
        }
    }, []);

    const handleNavKontorChange = (navKontor: string) => {
        onNavKontorChange({
            navKontor,
            navKontorNavn: hentNavKontoretsNavn(navKontor),
        });
    };

    return (
        <div className={css.wrapper}>
            {status === Status.Klar && (
                // @ts-ignore TODO: written before strict-mode enabled
                <microfrontend.current
                    appname="Rekrutteringsbistand"
                    useProxy={true}
                    enhet={{
                        initialValue: navKontor,
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
