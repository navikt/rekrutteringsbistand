import { FunctionComponent, useEffect, useState } from 'react';
import Navspa from '@navikt/navspa';
import loadjs from 'loadjs';
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
    onNavKontorChange: (navKontor: string) => void;
};

const Modiadekoratør: FunctionComponent<Props> = ({ navKontor, onNavKontorChange }) => {
    const Microfrontend = Navspa.importer<DekoratørProps>(appName);

    const [status, setStatus] = useState<Status>(
        loadjs.isDefined(appName) ? Status.Klar : Status.LasterNed
    );

    useEffect(() => {
        const loadAssets = async (staticPaths: string[]) => {
            try {
                await loadjs(staticPaths, appName, {
                    returnPromise: true,
                });

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

    return (
        <div className={css.placeholder}>
            {status === Status.Klar && (
                <Microfrontend
                    appname="Rekrutteringsbistand"
                    useProxy={true}
                    enhet={{
                        initialValue: navKontor,
                        display: EnhetDisplay.ENHET_VALG,
                        onChange: onNavKontorChange,
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
        return 'https://internarbeidsflatedecorator-q0.dev.intern.nav.no';
    } else if (window.location.hostname.includes('intern.nav.no')) {
        return 'https://internarbeidsflatedecorator.intern.nav.no';
    } else {
        return 'https://navikt.github.io';
    }
};

export default Modiadekoratør;
