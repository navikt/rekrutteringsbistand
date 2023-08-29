import useNavKontor from 'felles/store/navKontor';
import { Outlet } from 'react-router-dom';
import Dekoratør from './modiadekoratør/Modiadekoratør';
import Placeholder from './modiadekoratør/Placeholder';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useAmplitude from './useAmplitude';

const Modiadekoratør =
    import.meta.env.DEV && import.meta.env.VITE_MOCK_MODIA ? Placeholder : Dekoratør;

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();

    useAmplitude(navKontor);

    return (
        <>
            <Modiadekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
            <Navigeringsmeny />
            <Outlet />
        </>
    );
};

export default Header;
