import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hentKandidatliste, hentKandidatlisteMedStillingsId, hentStilling } from '../api/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { Navigeringsstate } from './useNavigeringsstate';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

export type KontekstAvKandidatlisteEllerStilling = {
    kandidatliste: Nettressurs<Kandidatliste>;
    stilling: Nettressurs<Stilling>;
    brukKriterierFraStillingen: boolean;
    setOppdatertKandidatliste: (kandidatliste: Kandidatliste) => void;
};

const useKontekstAvKandidatlisteEllerStilling = (
    navigeringsstate: Navigeringsstate
): KontekstAvKandidatlisteEllerStilling | null => {
    const [searchParams] = useSearchParams();
    const kandidatlisteId = searchParams.get('kandidatliste');

    const stillingId = searchParams.get('stilling');
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>({
        kind: Nettstatus.IkkeLastet,
    });
    const [stilling, setStilling] = useState<Nettressurs<Stilling>>({
        kind: Nettstatus.IkkeLastet,
    });

    useEffect(() => {
        const brukStilling = async (stillingsId: string) => {
            setStilling({
                kind: Nettstatus.LasterInn,
            });

            try {
                const stilling = await hentStilling(stillingsId);

                setStilling({
                    kind: Nettstatus.Suksess,
                    data: stilling,
                });
            } catch (error) {
                setStilling({
                    kind: Nettstatus.Feil,
                    error: { message: error as string },
                });
            }
        };

        const brukKandidatliste = async (kandidatlisteId: string): Promise<string | null> => {
            setKandidatliste({
                kind: Nettstatus.LasterInn,
            });

            try {
                const respons = await hentKandidatliste(kandidatlisteId);

                setKandidatliste({
                    kind: Nettstatus.Suksess,
                    data: respons,
                });
                return respons.stillingId;
            } catch (error) {
                setKandidatliste({
                    kind: Nettstatus.Feil,
                    error: { message: error as string },
                });
            }

            return null;
        };

        const brukKandidatlisteMedStillingsId = async (stillingId: string) => {
            setKandidatliste({
                kind: Nettstatus.LasterInn,
            });

            try {
                const respons = await hentKandidatlisteMedStillingsId(stillingId);

                setKandidatliste({
                    kind: Nettstatus.Suksess,
                    data: respons,
                });
            } catch (error) {
                setKandidatliste({
                    kind: Nettstatus.Feil,
                    error: { message: error as string },
                });
            }
        };

        const brukKontekstKandidatliste = async (kandidatlisteId: string) => {
            const listensStillingsId = await brukKandidatliste(kandidatlisteId);

            if (listensStillingsId) {
                brukStilling(listensStillingsId);
            }
        };

        const brukKontekstStilling = async (stillingId: string) => {
            if (stillingId) {
                brukStilling(stillingId);
                brukKandidatlisteMedStillingsId(stillingId);
            }
        };

        if (kandidatlisteId) {
            brukKontekstKandidatliste(kandidatlisteId);
        } else if (stillingId) {
            brukKontekstStilling(stillingId);
        }
    }, [kandidatlisteId, stillingId]);

    const memoisertReturverdi = useMemo(() => {
        if (kandidatlisteId === null && stillingId === null) {
            return null;
        } else {
            return {
                kandidatliste,
                stilling,
                brukKriterierFraStillingen: navigeringsstate.brukKriterierFraStillingen || false,
                setOppdatertKandidatliste: (kandidatliste: Kandidatliste) =>
                    setKandidatliste({
                        kind: Nettstatus.Suksess,
                        data: kandidatliste,
                    }),
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kandidatlisteId, kandidatliste, stilling, navigeringsstate.brukKriterierFraStillingen]);

    return memoisertReturverdi;
};

export type Stilling = {
    stilling: {
        uuid: string;
        categoryList: Array<{
            categoryType: 'STYRK08' | 'STYRK08NAV';
            name: string;
        }>;
        location: {
            municipalCode: string | null;
            municipal: string | null;
            postalCode: string | null;
            county: string | null;
        };
    };
};

export default useKontekstAvKandidatlisteEllerStilling;
