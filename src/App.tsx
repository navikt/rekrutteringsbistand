import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import useAmplitude from './header/useAmplitude';
import Header from './header/Header';
import Forside from './forside/Forside';

const App = () => {
    const [navKontor, setNavKontor] = useState<string | null>(null);

    useAmplitude(navKontor);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Header navKontor={navKontor} setNavKontor={setNavKontor} />,
            children: [
                {
                    path: '/',
                    element: <Forside navKontor={navKontor} />,
                },
                {
                    path: 'stillinger/*',
                    element: <div>Placeholder</div>,
                },
                {
                    path: 'stillingssok/*',
                    element: <div>Placeholder</div>,
                },
                {
                    path: 'kandidater/*',
                    element: <div>Placeholder</div>,
                },
                {
                    path: 'kandidatsok/*',
                    element: <div>Placeholder</div>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
