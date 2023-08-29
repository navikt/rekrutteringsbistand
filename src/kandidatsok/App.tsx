import '@reach/combobox/styles.css';
import useNavKontor from 'felles/store/navKontor';
import { useContext } from 'react';
import Kandidatsøk from './Kandidatsøk';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatlisteEllerStilling from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import { ØktContext, ØktContextProvider } from './Økt';

const App = () => {
    const navKontor = useNavKontor((state) => state.navKontor);

    const kandidatsøkØkt = useContext(ØktContext);
    const navigeringsstate = useNavigeringsstate();

    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatsøkØkt.forrigeØkt;

    const innloggetBruker = useInnloggetBruker(navKontor);
    const kontekstAvKandidatlisteEllerStilling =
        useKontekstAvKandidatlisteEllerStilling(navigeringsstate);

    return (
        <Kandidatsøk
            forrigeØkt={forrigeØkt}
            setØkt={kandidatsøkØkt.setØkt}
            navKontor={navKontor}
            innloggetBruker={innloggetBruker}
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
