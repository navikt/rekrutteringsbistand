import { FunctionComponent } from 'react';
import Navspa from '@navikt/navspa';
import DekoratørProps, { EnhetDisplay } from './DekoratørProps';
import css from './Modiadekoratør.module.css';

const Dekoratør = Navspa.importer<DekoratørProps>('internarbeidsflatefs');

type Props = {
    navKontor: string | null;
    onNavKontorChange: (navKontor: string) => void;
};

const Modiadekoratør: FunctionComponent<Props> = ({ navKontor, onNavKontorChange }) => {
    return (
        <div className={css.placeholder}>
            <Dekoratør
                useProxy
                appname="Rekrutteringsbistand"
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
        </div>
    );
};

export default Modiadekoratør;
