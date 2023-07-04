import { Outlet } from 'react-router-dom';
import Modiadekoratør from './modiadekoratør/Modiadekoratør';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useNavKontor from '../felles/store/navKontor';
import useAmplitude from './useAmplitude';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/mock-api');
}

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();

    useAmplitude(navKontor);

    return (
        <>
            <>
                <Modiadekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
                <Navigeringsmeny />
            </>
            <Outlet />
        </>
    );
};

export default Header;
