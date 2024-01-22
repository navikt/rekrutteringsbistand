import React from 'react';
import { kandidatNavnDTO } from './kandidatNav.dto';
import { kandidatNavnMockGenerator } from './kandidatNavn.testdata';

export const useKandidatNavn = (fnr: string): kandidatNavnDTO => {
    const [navn, setNavn] = React.useState<kandidatNavnDTO>(null);

    React.useEffect(() => {
        const hentNavIdent = async () => {
            // TODO post & fetch data .
            // Er ikke i bruk før nye endepunkt er klare.
            setNavn(kandidatNavnMockGenerator());
        };

        hentNavIdent();
    }, []);

    return navn;
};
