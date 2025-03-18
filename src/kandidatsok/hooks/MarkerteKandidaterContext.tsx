import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { KandidatSøkContext } from '../KandidatSøkContext';

interface MarkerteKandidaterContextType {
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string | string[]) => void;
    fjernMarkering: () => void;
}

const MarkerteKandidaterContext = createContext<MarkerteKandidaterContextType | undefined>(
    undefined
);

export const MarkerteKandidaterProvider = ({
    children,
    stillingId,
}: {
    children: ReactNode;
    stillingId: string | null;
}) => {
    const { kandidatSøkØkt } = useContext(KandidatSøkContext);
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<string>>(new Set());

    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem('kandidatsøk-økt') || '{}');
        const markerteFromStorage = sessionData?.markerteKandidater?.[stillingId ?? ''] ?? [];
        setMarkerteKandidater(new Set(markerteFromStorage));
    }, [stillingId]);

    const onMarkerKandidat = useCallback(
        (kandidatNr: string | string[]) => {
            const sessionData = JSON.parse(sessionStorage.getItem('kandidatsøk-økt') || '{}');
            const nySet = Array.isArray(kandidatNr)
                ? new Set(kandidatNr)
                : new Set(
                      markerteKandidater.has(kandidatNr)
                          ? Array.from(markerteKandidater).filter((k) => k !== kandidatNr)
                          : [...markerteKandidater, kandidatNr]
                  );
            setMarkerteKandidater(nySet);

            if (stillingId) {
                const updatedData = {
                    ...sessionData,
                    markerteKandidater: {
                        ...sessionData.markerteKandidater,
                        [stillingId]: Array.from(nySet),
                    },
                };
                sessionStorage.setItem('kandidatsøk-økt', JSON.stringify(updatedData));
                kandidatSøkØkt?.setØkt(updatedData);
            }
        },
        [stillingId, kandidatSøkØkt, markerteKandidater]
    );

    const fjernMarkering = useCallback(() => {
        setMarkerteKandidater(new Set());
        if (stillingId) {
            const sessionData = JSON.parse(sessionStorage.getItem('kandidatsøk-økt') || '{}');
            const updatedData = {
                ...sessionData,
                markerteKandidater: {
                    ...sessionData.markerteKandidater,
                    [stillingId]: [],
                },
            };
            sessionStorage.setItem('kandidatsøk-økt', JSON.stringify(updatedData));
            kandidatSøkØkt?.setØkt(updatedData);
        }
    }, [stillingId, kandidatSøkØkt]);

    return (
        <MarkerteKandidaterContext.Provider
            value={{ markerteKandidater, onMarkerKandidat, fjernMarkering }}
        >
            {children}
        </MarkerteKandidaterContext.Provider>
    );
};

export const useMarkerteKandidaterØkt = () => {
    const context = useContext(MarkerteKandidaterContext);
    if (!context) {
        throw new Error('useMarkerteKandidaterØkt must be used within MarkerteKandidaterProvider');
    }
    return context;
};
