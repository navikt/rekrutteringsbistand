import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Appfeil from './felles/komponenter/feilmelding/Appfeil';
import Header from './header/Header';

import { Component as Forside } from './forside/index';
import { Component as Kandidat } from './kandidat/index';
import { Component as Kandidatsøk } from './kandidatsok/index';
import { Component as Stilling } from './stilling/index';
import { Component as Stillingssøk } from './stillingssok/index';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header />}>
                <Route path="/" element={<Forside />} />
                <Route
                    path="stillingssok/:kandidat?"
                    element={<Stillingssøk />}
                    errorElement={<Appfeil />}
                />
                <Route path="stillinger/*" element={<Stilling />} errorElement={<Appfeil />} />
                <Route path="kandidatsok" element={<Kandidatsøk />} errorElement={<Appfeil />} />
                <Route path="kandidater/*" element={<Kandidat />} errorElement={<Appfeil />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
