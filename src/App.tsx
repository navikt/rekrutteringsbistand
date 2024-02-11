import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Appfeil from './felles/komponenter/feilmelding/Appfeil';
import Header from './header/Header';

import FormidlingsSide from './formidling/Formidling';
import Forside from './forside/Forside';
import { Component as Kandidat } from './kandidat/index';
import { KandidatSøkIndex } from './kandidatsok/index';
import { Component as Stilling } from './stilling/index';
import InngangFraArbop from './stilling/stillingssok/inngang-fra-arbop/InngangFraArbop';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header />}>
                <Route path="/" element={<Forside />} />
                <Route path="stillinger/*" element={<Stilling />} errorElement={<Appfeil />} />
                <Route
                    path="kandidatsok"
                    element={<KandidatSøkIndex />}
                    errorElement={<Appfeil />}
                />
                <Route path="kandidater/*" element={<Kandidat />} errorElement={<Appfeil />} />
                <Route
                    path="formidlinger/*"
                    element={<FormidlingsSide />}
                    errorElement={<Appfeil />}
                />

                <Route
                    path="stillingssok/personbruker"
                    element={<InngangFraArbop />}
                    errorElement={<Appfeil />}
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
