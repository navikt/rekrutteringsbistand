import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocalStorageToggle } from '../dev/DevUtil';
import { ApplikasjonContext } from './ApplikasjonContext';
import Dekoratør from './header/modiadekoratør/Modiadekoratør';
import Placeholder from './header/modiadekoratør/Placeholder';
import InfoAlert from './header/navigeringsmeny/InfoAlert';
import Navigeringsmeny from './header/navigeringsmeny/Navigeringsmeny';
import useAmplitude from './header/useAmplitude';
import { Rolle } from './tilgangskontroll/Roller';
import InfoAlertMidlertidigNedetid from 'felles/header/navigeringsmeny/InfoAlertMidlertidigNedetid';

const Header = () => {
    const [mockAktiv] = useLocalStorageToggle('Mock modia');
    const { setValgtNavKontor, valgtNavKontor, harRolle } = useContext(ApplikasjonContext);
    useAmplitude(valgtNavKontor?.navKontor ?? null);
    const Modiadekoratør = import.meta.env.DEV && mockAktiv ? Placeholder : Dekoratør;

    return (
        <>
            <Modiadekoratør
                navKontor={valgtNavKontor?.navKontor ?? null}
                onNavKontorChange={(navKontor) => {
                    setValgtNavKontor(navKontor);
                }}
            />

            <InfoAlertMidlertidigNedetid />

            <Navigeringsmeny />
            {!harRolle([
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
            ]) && <InfoAlert />}
            <Outlet />
        </>
    );
};

export default Header;
