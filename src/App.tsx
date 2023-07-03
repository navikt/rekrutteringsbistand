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
                <Route path="/" element={<Forside />} /*lazy={() => import('./forside/index')}*/ />
                <Route
                    path="stillingssok/:fnr?"
                    element={<Stillingssøk />} /*lazy={() => import('./stillingssok/index')}*/
                />
                <Route
                    path="stillinger/*"
                    element={<Stilling />} /*lazy={() => import('./stilling/index')}*/
                />
                <Route
                    path="kandidatsok"
                    element={<Kandidatsøk />} /*lazy={() => import('./kandidatsok/index')}*/
                />
                <Route
                    path="kandidater/*"
                    element={<Kandidat />} /*lazy={() => import('./kandidat/index')}*/
                />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
