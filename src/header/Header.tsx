import { Outlet } from 'react-router-dom';
import Modiadekoratør from './modia/Modiadekoratør';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';

type Props = {
    navKontor: string | null;
    setNavKontor: (navKontor: string) => void;
};

const Header = ({ navKontor, setNavKontor }: Props) => (
    <>
        <header>
            <Modiadekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
            <Navigeringsmeny />
        </header>
        <Outlet />
    </>
);

export default Header;
