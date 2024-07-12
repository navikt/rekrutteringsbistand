import { Alert } from '@navikt/ds-react';
import { useState } from 'react';

import { sendEvent } from 'felles/amplitude';
import { leggTilKandidatIKandidatliste } from '../../../api/kandidat-api/leggTilKandidat';
import Knapper from './Knapper';

type IBekreftLeggTilKandidat = {
    kandidatnr: string;
    onAvbryt: () => void;
    onBekreft: (melding: string) => void;
    erAnbefaling?: boolean;
    stillingId: string;
    setRegistrerFormidling?: () => void;
};

const BekreftLeggTilKandidat: React.FC<IBekreftLeggTilKandidat> = ({
    kandidatnr,
    onAvbryt,
    onBekreft,
    erAnbefaling = false,
    stillingId,
    setRegistrerFormidling,
}) => {
    const [laster, setLaster] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string | null>(null);

    const onLeggTilKandidat = async () => {
        setLaster(true);
        setError(false);

        sendEvent('legg_til_kandidat', 'klikk', {
            app: 'stilling',
            erAnbefaling,
        });

        const respons = await leggTilKandidatIKandidatliste({ stillingId, kandidatnr });

        if (respons.ok) {
            setLaster(false);
            onBekreft('');
        } else {
            setLaster(false);
            setError(true);
            if (respons.status === 403) {
                setFeilmelding('Du har ikke tilgang til å legge kandidaten til denne listen');
            } else {
                setFeilmelding('Klarte ikke å legge til kandidat');
            }
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
                    {feilmelding ?? 'Klarte ikke å legge til kandidat'}
                </Alert>
            )}
        </>
    );
};

export default BekreftLeggTilKandidat;
