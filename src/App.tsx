import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import Header from './header/Header';
import useNavKontor from './felles/navKontor';

const App = () => {
    const { navKontor, setNavKontor } = useNavKontor();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header navKontor={navKontor} setNavKontor={setNavKontor} />}>
                <Route path="/" lazy={() => import('./forside/index')} />
                <Route path="stillinger/*" element={<div>Placeholder</div>} />
                <Route path="stillingssok/*" element={<div>Placeholder</div>} />
                <Route path="kandidater/*" element={<div>Placeholder</div>} />
                <Route path="kandidatsok/*" element={<div>Placeholder</div>} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
