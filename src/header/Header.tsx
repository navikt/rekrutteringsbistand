import useNavKontor from 'felles/store/navKontor';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocalStorageToggle } from '../dev/DevUtil';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import Dekoratør from './modiadekoratør/Modiadekoratør';
import Placeholder from './modiadekoratør/Placeholder';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useAmplitude from './useAmplitude';

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();
    const [mockAktiv] = useLocalStorageToggle('Mock modia');
    useAmplitude(navKontor);

    const { setValgtNavKontor } = useContext(ApplikasjonContext);

    const Modiadekoratør = import.meta.env.DEV && mockAktiv ? Placeholder : Dekoratør;

    console.log('🎺 navKontor', navKontor);
    return (
        <>
            <Modiadekoratør
                navKontor={navKontor}
                onNavKontorChange={(navKontor) => {
                    setNavKontor(navKontor);
                    setValgtNavKontor(navKontor?.navKontor);
                }}
            />
            <Navigeringsmeny />
            <Outlet />
        </>
    );
};

export default Header;
