import { FunctionComponent, useEffect, useState } from 'react';

import Navigeringsmeny from './header/navigeringsmeny/Navigeringsmeny';
import Modiadekoratør from './header/modia/Modiadekoratør';
import {
    AmplitudeEvent,
    sendEvent,
    sendGenerellEvent,
    setNavKontorForAmplitude,
} from './felles/amplitude';
import { generaliserPath } from './header/utils/path';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { History } from 'history';

type Props = {
    history: History;
};

const App: FunctionComponent<Props> = ({ history }) => {
    const location = useLocation();

    const [navKontor, setNavKontor] = useState<string | null>(null);
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

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <header>
                            <Modiadekoratør
                                navKontor={navKontor}
                                onNavKontorChange={setNavKontor}
                            />
                            <Navigeringsmeny />
                        </header>
                        <Outlet />
                    </>
                }
            >
                <Route index element={<div>Placeholder</div>} />
                <Route path="stillinger/*" element={<div>Placeholder</div>} />
                <Route path="stillingssok/*" element={<div>Placeholder</div>} />
                <Route path="kandidater/*" element={<div>Placeholder</div>} />
                <Route path="kandidatsok/*" element={<div>Placeholder</div>} />
            </Route>
        </Routes>
    );
};

export default App;
