import useNavKontor from '../felles/store/navKontor';

const Forside = () => {
    const navKontor = useNavKontor((state) => state.navKontor);

    return <div>Valgt NAV-kontor er {navKontor}</div>;
};

export default Forside;
