import useNavKontor from 'felles/store/navKontor';
import { Outlet } from 'react-router-dom';
import { useLocalStorageToggle } from '../dev/DevUtil';
import Dekoratør from './modiadekoratør/Modiadekoratør';
import Placeholder from './modiadekoratør/Placeholder';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useAmplitude from './useAmplitude';

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();
    const [mockAktiv] = useLocalStorageToggle('Mock modia');
    useAmplitude(navKontor);

    const Modiadekoratør = import.meta.env.DEV && mockAktiv ? Placeholder : Dekoratør;

    return (
        <>
            <Modiadekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
            <Navigeringsmeny />
            <Outlet />
        </>
    );
};

export default Header;
