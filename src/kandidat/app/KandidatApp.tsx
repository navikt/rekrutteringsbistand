import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Varsling } from 'felles/varsling/Varsling';
import { TilToppenKnapp } from '../../felles/komponenter/tilToppenKnapp/TilToppenKnapp';
import { Rolle } from '../../felles/tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import Kandidatside from '../kandidatside/Kandidatside';
import CvSide from '../kandidatside/cv/CvSide';
import Historikkside from '../kandidatside/historikk/Historikkside';
import NotFound from '../komponenter/errorside/NotFound';
import store from '../state/reduxStore';
import css from './KandidatApp.module.css';
import ManglerTilgang from './ManglerTilgang';

const App = () => {
    return (
        <>
            <Varsling />
            <div className={css.app}>
                <main className={css.main}>
                    <Routes>
                        <Route path="mangler-tilgang" element={<ManglerTilgang />} />
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

const KandidatApp = () => (
    <TilgangskontrollForInnhold
        kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ]}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </TilgangskontrollForInnhold>
);

export default KandidatApp;
