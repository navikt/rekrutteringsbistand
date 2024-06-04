import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import RouterFeil from './felles/feilhåndtering/RouterFeil';

import Header from './felles/Header';
import FormidlingsSide from './formidling/Formidling';
import Forside from './forside/Forside';
import KandidatApp from './kandidat/app/KandidatApp';
import { KandidatSøkIndex } from './kandidatsok/index';
import { Component as Stilling } from './stilling/index';
import InngangFraArbop from './stilling/stillingssok/inngang-fra-arbop/InngangFraArbop';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header />}>
                <Route path="/" element={<Forside />} errorElement={<RouterFeil />} />
                <Route path="stillinger/*" element={<Stilling />} errorElement={<RouterFeil />} />
                <Route
                    path="kandidatsok"
                    element={<KandidatSøkIndex />}
                    errorElement={<RouterFeil />}
                />
                <Route
                    path="kandidater/*"
                    element={<KandidatApp />}
                    errorElement={<RouterFeil />}
                />
                <Route
                    path="formidlinger/*"
                    element={<FormidlingsSide />}
                    errorElement={<RouterFeil />}
                />

                <Route
                    path="stillingssok/personbruker"
                    element={<InngangFraArbop />}
                    errorElement={<RouterFeil />}
                />

                <Route
                    path="stillingssok"
                    element={<Navigate to="/stillinger/stillingssok?brukStandardsok" />}
                />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
