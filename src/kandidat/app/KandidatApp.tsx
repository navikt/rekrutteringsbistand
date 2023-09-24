import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import KandidatlistesideMedStilling from '../kandidatliste/KandidatlistesideMedStilling';
import KandidatlisteUtenStilling from '../kandidatliste/KandidatlistesideUtenStilling';
import Kandidatlisteoversikt from '../kandidatlisteoversikt/Kandidatlisteoversikt';
import Kandidatside from '../kandidatside/Kandidatside';
import CvSide from '../kandidatside/cv/CvSide';
import Historikkside from '../kandidatside/historikk/Historikkside';
import NotFound from '../komponenter/errorside/NotFound';
import { TilToppenKnapp } from '../../felles/komponenter/tilToppenKnapp/TilToppenKnapp';
import store from '../state/reduxStore';
import Varsling from '../varsling/Varsling';
import css from './KandidatApp.module.css';
import ManglerTilgang from './ManglerTilgang';

const KandidatApp = () => {
    return (
        <>
            <Varsling />
            <div className={css.app}>
                <main className={css.main}>
                    <Routes>
                        <Route path="mangler-tilgang" element={<ManglerTilgang />} />

                        <Route path="lister" element={<Kandidatlisteoversikt />} />
                        <Route
                            path="lister/stilling/:id/detaljer"
                            element={<KandidatlistesideMedStilling />}
                        />
                        <Route
                            path="lister/detaljer/:listeid"
                            element={<KandidatlisteUtenStilling />}
                        />
                        <Route path="kandidat/:kandidatnr" element={<Kandidatside />}>
                            <Route path="cv" element={<CvSide />} />
                            <Route path="historikk" element={<Historikkside />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
            <TilToppenKnapp />
        </>
    );
};

const MedProvider = () => (
    <Provider store={store}>
        <KandidatApp />
    </Provider>
);

export default MedProvider;
