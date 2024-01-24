import { Alert } from '@navikt/ds-react';
import { useState } from 'react';

import { sendEvent } from 'felles/amplitude';
import { leggTilKandidatKandidatliste } from '../../../api/kandidat-api/kandidat.api';
import Knapper from './Knapper';

type IBekreftLeggTilKandidat = {
    kandidatnr: string;
    // onOppdatertKandidatliste?: (kandidatliste: Kandidatliste) => void;
    onAvbryt: () => void;
    onBekreft: (melding: string) => void;
    erAnbefaling?: boolean;
    kandidatlisteId: string;
};

const BekreftLeggTilKandidat: React.FC<IBekreftLeggTilKandidat> = ({
    kandidatnr,
    // onOppdatertKandidatliste,
    onAvbryt,
    onBekreft,
    erAnbefaling = false,
    kandidatlisteId,
}) => {
    const [laster, setLaster] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const onLeggTilKandidat = async () => {
        setLaster(true);
        setError(false);

        sendEvent('legg_til_kandidat', 'klikk', {
            app: 'stilling',
            erAnbefaling,
        });

        const respons = await leggTilKandidatKandidatliste(kandidatlisteId, kandidatnr);

        // setLeggTilKandidat(respons);

        if (respons.ok) {
            setLaster(false);
            onBekreft('');
            // if (onOppdatertKandidatliste) {
            //     onOppdatertKandidatliste(respons.data);
            // }
        } else {
            setLaster(false);
            setError(true);
        }
    };

    let leggTilTekst: string;
    if (erAnbefaling) {
        leggTilTekst = 'Anbefal';
    } else {
        leggTilTekst = 'Legg til';
    }

    return (
        <>
            <Knapper
                onLeggTilClick={onLeggTilKandidat}
                onAvbrytClick={onAvbryt}
                leggTilSpinner={laster}
                leggTilTekst={leggTilTekst}
                leggTilDisabled={laster}
                avbrytDisabled={laster}
            />
            {error && (
                <Alert fullWidth variant="error" size="small">
                    Klarte ikke å legge til kandidat
                </Alert>
            )}
        </>
    );
};

export default BekreftLeggTilKandidat;
