import {
    AmplitudeEvent,
    sendEvent,
    sendGenerellEvent,
    setNavKontorForAmplitude,
} from 'felles/amplitude';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { generaliserPath } from './utils/path';

const useAmplitude = (navKontor: string | null) => {
    const location = useLocation();
    const [harSendtÅpneAppEvent, setHarSendtÅpneAppEvent] = useState<boolean>(false);

    useEffect(() => {
        const konfigurerAmplitudeOgSendEvents = (navKontor: string) => {
            setNavKontorForAmplitude(navKontor);

            sendGenerellEvent(AmplitudeEvent.Sidevisning, {
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
