import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Header from './header/Header';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header />}>
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
