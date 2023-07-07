import { useCallback, useEffect, useState } from 'react';
import { hentMineKandidatlister } from '../api/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { Kandidatliste } from '../hooks/useKontekstAvKandidatlisteEllerStilling';

type MinKandidatliste = Omit<Kandidatliste, 'kandidater'> & {
    antallKandidater: number;
};

export type MineKandidatlister = {
    liste: MinKandidatliste[];
    antall: number;
};

const SIDESTØRRELSE = 8;

const useMineKandidatlister = (side: number) => {
    const [mineKandidatlister, setMineKandidatlister] = useState<Nettressurs<MineKandidatlister>>({
        kind: Nettstatus.IkkeLastet,
    });

    const lastInnKandidatlister = useCallback(async () => {
        setMineKandidatlister(
            mineKandidatlister.kind === Nettstatus.Suksess
                ? { kind: Nettstatus.Oppdaterer, data: mineKandidatlister.data }
                : {
                      kind: Nettstatus.LasterInn,
                  }
        );

        try {
            const nesteSideMedLister = await hentMineKandidatlister(side, SIDESTØRRELSE);

            setMineKandidatlister({
                kind: Nettstatus.Suksess,
                data: nesteSideMedLister,
            });
        } catch (e) {
            setMineKandidatlister({
                kind: Nettstatus.Feil,
                error: {
                    message: e as string,
                },
            });
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [side]);

    useEffect(() => {
        lastInnKandidatlister();
    }, [lastInnKandidatlister]);

    return mineKandidatlister;
};

export default useMineKandidatlister;
