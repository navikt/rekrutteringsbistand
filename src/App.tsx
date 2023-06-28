import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Navigeringsmeny from './header/navigeringsmeny/Navigeringsmeny';
import Modiadekoratør from './header/modia/Modiadekoratør';
import useAmplitude from './header/useAmplitude';

const App = () => {
    const [navKontor, setNavKontor] = useState<string | null>(null);

    useAmplitude(navKontor);

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
