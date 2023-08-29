import { create } from 'zustand';

export type NavKontorMedNavn = {
    navKontor: string;
    navKontorNavn: string | null;
};

type NavKontorState = {
    navKontor: string | null;
    navKontorNavn: string | null;
    setNavKontor: (navKontor: NavKontorMedNavn) => void;
};

const useNavKontor = create<NavKontorState>((set) => ({
    navKontor: null,
    navKontorNavn: null,
    setNavKontor: (navKontor) => set({ ...navKontor }),
}));

export default useNavKontor;
