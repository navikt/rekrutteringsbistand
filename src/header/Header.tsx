import useNavKontor from 'felles/store/navKontor';
import { Outlet } from 'react-router-dom';
import { useLocalStorageToggle } from '../dev/DevUtil';
import Dekoratør from './modiadekoratør/Modiadekoratør';
import Placeholder from './modiadekoratør/Placeholder';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useAmplitude from './useAmplitude';
import React, { useEffect } from 'react';

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();
    const [mockAktiv] = useLocalStorageToggle('Mock modia');
    useAmplitude(navKontor);

    useEffect(() => {
        // Vi hadde en alert i en periode som brukte keyen under for å huske
        // om brukeren hadde lukket alerten. Dette er bare litt cleanup hos
        // i brukerens nettleser. Er ikke farlig å slette. Slett gjerne koden
        // etter 2024-03-15, f.eks.
        window.localStorage.removeItem('nedetid pg11-oppgradering');
    }, []);

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
