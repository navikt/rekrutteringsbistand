import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Header from './header/Header';

import { Component as Forside } from './forside/index';
import { Component as Stillingssøk } from './stillingssok/index';
import { Component as Stilling } from './stilling/index';
import { Component as Kandidatsøk } from './kandidatsok/index';
import { Component as Kandidat } from './kandidat/index';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header />}>
                <Route path="/" element={<Forside />} />
                <Route path="stillingssok/:fnr?" element={<Stillingssøk />} />
                <Route path="stillinger/*" element={<Stilling />} />
                <Route path="kandidatsok" element={<Kandidatsøk />} />
                <Route path="kandidater/*" element={<Kandidat />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
