import '@reach/combobox/styles.css';
import Tilgangskontroll, { Rolle } from '../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { KandidatSøkContextProvider } from './KandidatSøkContext';
import Kandidatsøk from './Kandidatsøk';

export const KandidatSøkIndex = () => {
    return (
        <Tilgangskontroll
            kreverEnAvRollene={[
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            ]}
        >
            <KandidatSøkContextProvider>
                <Kandidatsøk />
            </KandidatSøkContextProvider>
        </Tilgangskontroll>
    );
};
