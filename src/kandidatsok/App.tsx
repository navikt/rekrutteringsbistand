import { useContext } from 'react';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatlisteEllerStilling from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import { ØktContext, ØktContextProvider } from './Økt';
import Kandidatsøk from './Kandidatsøk';
import useNavKontor from 'felles/store/navKontor';
import '@reach/combobox/styles.css';

const App = () => {
    const { navKontor } = useNavKontor();

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
