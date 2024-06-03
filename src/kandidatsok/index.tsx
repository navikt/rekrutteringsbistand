import '@reach/combobox/styles.css';
import { Rolle } from '../felles/tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { KandidatSøkContextProvider } from './KandidatSøkContext';
import Kandidatsøk from './Kandidatsøk';

export const KandidatSøkIndex = () => {
    return (
        <TilgangskontrollForInnhold
            kreverEnAvRollene={[
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            ]}
        >
            <KandidatSøkContextProvider>
                <Kandidatsøk />
            </KandidatSøkContextProvider>
        </TilgangskontrollForInnhold>
    );
};
