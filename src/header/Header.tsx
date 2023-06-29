import { Outlet } from 'react-router-dom';
import Modiadekoratør from './modia/Modiadekoratør';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useNavKontor from '../felles/store/navKontor';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/mock-api');
}

const Header = () => {
    // useAmplitude(navKontor);

    const { navKontor, setNavKontor } = useNavKontor();

    return (
        <>
            <header>
                <Modiadekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
                <Navigeringsmeny />
            </header>
            <Outlet />
        </>
    );
};

export default Header;
