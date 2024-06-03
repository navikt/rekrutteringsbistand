import { useEffect, useState } from 'react';
import {
    setNavKontorForAmplitude,
    sendGenerellEvent,
    AmplitudeEvent,
    sendEvent,
} from 'felles/amplitude';
import { generaliserPath } from './utils/path';
import { useLocation } from 'react-router-dom';

const useAmplitude = (navKontor: string | null) => {
    const location = useLocation();
    const [harSendtÅpneAppEvent, setHarSendtÅpneAppEvent] = useState<boolean>(false);

    useEffect(() => {
        const konfigurerAmplitudeOgSendEvents = async (navKontor: string) => {
            setNavKontorForAmplitude(navKontor);

            await sendGenerellEvent(AmplitudeEvent.Sidevisning, {
                path: generaliserPath(location.pathname),
            });

            if (!harSendtÅpneAppEvent) {
                sendEvent('app', 'åpne', {
                    skjermbredde: window.screen.width,
                });

                setHarSendtÅpneAppEvent(true);
            }
        };

        if (navKontor) {
            konfigurerAmplitudeOgSendEvents(navKontor);
        }
    }, [location.pathname, navKontor, harSendtÅpneAppEvent]);
};

export default useAmplitude;
