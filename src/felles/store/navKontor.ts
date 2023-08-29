import { create } from 'zustand';

export type NavKontor = {
    navn: string;
    enhetId: string;
};

type NavKontorState = {
    navKontor: NavKontor | null;
    setNavKontor: (navKontor: NavKontor) => void;
};

const useNavKontor = create<NavKontorState>((set) => ({
    navKontor: null,
    setNavKontor: (navKontor) => set({ navKontor }),
}));

export default useNavKontor;
