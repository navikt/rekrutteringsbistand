import { Outlet } from 'react-router-dom';
import Modiadekoratør from './modiadekoratør/Modiadekoratør';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useNavKontor from '../felles/store/navKontor';
import useAmplitude from './useAmplitude';
import Placeholder from './modiadekoratør/Placeholder';

const Dekoratør =
    import.meta.env.DEV && import.meta.env.VITE_MOCK_MODIA ? Placeholder : Modiadekoratør;

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();

    useAmplitude(navKontor);

    return (
        <>
            <Dekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
            <Navigeringsmeny />
            <Outlet />
        </>
    );
};

export default Header;
