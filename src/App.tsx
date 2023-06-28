import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import useAmplitude from './header/useAmplitude';
import Header from './header/Header';

const App = () => {
    const [navKontor, setNavKontor] = useState<string | null>(null);

    useAmplitude(navKontor);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Header navKontor={navKontor} setNavKontor={setNavKontor} />,
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
    ]);

    return <RouterProvider router={router} />;
};

export default App;
