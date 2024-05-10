import { Alert } from '@navikt/ds-react';
import { useState } from 'react';

import { sendEvent } from 'felles/amplitude';
import { leggTilKandidatKandidatliste } from '../../../api/kandidat-api/leggTilKandidat';
import Knapper from './Knapper';

type IBekreftLeggTilKandidat = {
    kandidatnr: string;
    onAvbryt: () => void;
    onBekreft: (melding: string) => void;
    erAnbefaling?: boolean;
    kandidatlisteId: string;
    setRegistrerFormidling?: () => void;
};

const BekreftLeggTilKandidat: React.FC<IBekreftLeggTilKandidat> = ({
    kandidatnr,
    onAvbryt,
    onBekreft,
    erAnbefaling = false,
    kandidatlisteId,
    setRegistrerFormidling,
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

        if (respons.ok) {
            setLaster(false);
            onBekreft('');
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
                setRegistrerFormidling={setRegistrerFormidling}
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
