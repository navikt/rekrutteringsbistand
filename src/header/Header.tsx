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
            {visNedetidvarsel ? (
                <Alert
                    variant="warning"
                    fullWidth={true}
                    closeButton
                    onClose={() => {
                        setVisNedetidvarsel(false);
                        window.localStorage.setItem('nedetid pg11-oppgradering', 'false');
                    }}
                >
                    Rekrutteringsbistand vil være skrudd av i dag (XX. februar) mellom XX:XX og
                    YY:YY for vedlikehold. Vi beklager ulempen.
                </Alert>
            ) : null}
            <Navigeringsmeny />
            <Outlet />
        </>
    );
};

export default Header;
