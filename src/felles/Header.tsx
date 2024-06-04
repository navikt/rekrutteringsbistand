import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocalStorageToggle } from '../dev/DevUtil';
import { ApplikasjonContext } from './ApplikasjonContext';
import Dekoratør from './header/modiadekoratør/Modiadekoratør';
import Placeholder from './header/modiadekoratør/Placeholder';
import Navigeringsmeny from './header/navigeringsmeny/Navigeringsmeny';
import useAmplitude from './header/useAmplitude';

const Header = () => {
    const [mockAktiv] = useLocalStorageToggle('Mock modia');
    const { setValgtNavKontor, valgtNavKontor } = useContext(ApplikasjonContext);
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
            <Navigeringsmeny />
            <Outlet />
        </>
    );
};

export default Header;
