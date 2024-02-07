import '@reach/combobox/styles.css';
import { useContext } from 'react';
import Kandidatsøk from './Kandidatsøk';
import useKontekstAvKandidatlisteEllerStilling from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import { ØktContext, ØktContextProvider } from './Økt';

const App = () => {
    const kandidatsøkØkt = useContext(ØktContext);
    const navigeringsstate = useNavigeringsstate();

    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatsøkØkt.forrigeØkt;

    const kontekstAvKandidatlisteEllerStilling =
        useKontekstAvKandidatlisteEllerStilling(navigeringsstate);

    return (
        <Kandidatsøk
            forrigeØkt={forrigeØkt}
            setØkt={kandidatsøkØkt.setØkt}
            kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
        />
    );
};

const AppMedContext = () => {
    return (
        <ØktContextProvider>
            <App />
        </ØktContextProvider>
    );
};

export default AppMedContext;
