import { create } from 'zustand';

type NavKontorState = {
    navKontor: string | null;
    setNavKontor: (navKontor: string) => void;
};

const useNavKontor = create<NavKontorState>((set) => ({
    navKontor: null,
    setNavKontor: (navKontor) => set({ navKontor }),
}));

export default useNavKontor;
