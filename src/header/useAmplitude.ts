import { useEffect, useState } from 'react';
import {
    setNavKontorForAmplitude,
    sendGenerellEvent,
    AmplitudeEvent,
    sendEvent,
} from '../felles/amplitude';
import { generaliserPath } from './utils/path';

const useAmplitude = (navKontor: string | null) => {
    const [harSendtÅpneAppEvent, setHarSendtÅpneAppEvent] = useState<boolean>(false);

    useEffect(() => {
        const konfigurerAmplitudeOgSendEvents = async (navKontor: string) => {
            setNavKontorForAmplitude(navKontor);

            await sendGenerellEvent(AmplitudeEvent.Sidevisning, {
                path: generaliserPath(location.pathname),
            });

            if (!harSendtÅpneAppEvent) {
                sendEvent(AmplitudeEvent.ÅpneRekrutteringsbistand, {
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
