import useNavKontor from 'felles/store/navKontor';
import { Outlet } from 'react-router-dom';
import { useLocalStorageToggle } from '../dev/DevUtil';
import Dekoratør from './modiadekoratør/Modiadekoratør';
import Placeholder from './modiadekoratør/Placeholder';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny';
import useAmplitude from './useAmplitude';
import React, { useState } from 'react';
import { Alert } from '@navikt/ds-react';

const Header = () => {
    const { navKontor, setNavKontor } = useNavKontor();
    const [mockAktiv] = useLocalStorageToggle('Mock modia');
    const [visNedetidvarsel, setVisNedetidvarsel] = useState(
        () => window.localStorage.getItem('nedetid pg11-oppgradering') !== 'false'
    );
    useAmplitude(navKontor);

    const Modiadekoratør = import.meta.env.DEV && mockAktiv ? Placeholder : Dekoratør;

    return (
        <>
            <Modiadekoratør navKontor={navKontor} onNavKontorChange={setNavKontor} />
            <Navigeringsmeny />
            {visNedetidvarsel ? (
                <div style={{ maxWidth: '60rem', margin: '8px auto' }}>
                    <Alert
                        variant="warning"
                        closeButton
                        onClose={() => {
                            setVisNedetidvarsel(false);
                            window.localStorage.setItem('nedetid pg11-oppgradering', 'false');
                        }}
                    >
                        Sending av SMS og visning av kontorstatistikk vil være skrudd av torsdag 29.
                        februar fra 16:00 til 17:00 for vedlikehold. Vi beklager ulempen.
                    </Alert>
                </div>
            ) : null}
            <Outlet />
        </>
    );
};

export default Header;
