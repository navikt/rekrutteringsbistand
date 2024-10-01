import NAVSPA from '@navikt/navspa';
import loadjs from 'loadjs';
import { ComponentType, FunctionComponent, useEffect, useRef, useState } from 'react';
import { NavKontorMedNavn } from '../../ApplikasjonContext';
import { DecoratorProps } from './DekoratørProps';
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
    const microfrontend = useRef<ComponentType<DecoratorProps>>();

    const [status, setStatus] = useState<Status>(
        loadjs.isDefined(appName) ? Status.Klar : Status.LasterNed
    );

    useEffect(() => {
        const loadAssets = async (staticPaths: string[]) => {
            try {
                await loadjs(staticPaths, appName, {
                    returnPromise: true,
                });

                const component = NAVSPA.importer<DecoratorProps>(
                    `internarbeidsflate-decorator-v3`
                );
                microfrontend.current = component;

                setStatus(Status.Klar);
            } catch (e) {
                setStatus(Status.Feil);
            }
        };

        if (!loadjs.isDefined(appName)) {
            loadAssets([
                `https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css`,
                `https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js`,
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
                    onEnhetChanged={handleNavKontorChange}
                    ignoreWsEvents={true}
                    toggles={{
                        visVeileder: true,
                    }}
                />
            )}

            {status === Status.Feil && <span>Klarte ikke å laste inn Modia-dekoratør</span>}
        </div>
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
