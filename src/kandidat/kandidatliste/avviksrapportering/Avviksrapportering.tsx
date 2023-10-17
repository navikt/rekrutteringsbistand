import { CheckmarkCircleIcon, HikingTrailSignIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import { api, get } from 'felles/api';
import { Avviksrapport } from 'felles/domene/kandidatliste/Avviksrapport';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { formaterDatoNaturlig } from '../../utils/dateUtils';
import AvviksrapporteringModal from '../modaler/avviksrapportering-modal/AvviksrapporteringModal';
import css from './Avviksrapportering.module.css';

type Props = {
    kandidatlisteId: string;
};

const Avviksrapportering = ({ kandidatlisteId }: Props) => {
    const [visAvviksrapporteringModal, setVisAvviksrapporteringModal] = useState<boolean>(false);
    const [avviksrapport, setAvviksrapport] = useState<Nettressurs<Avviksrapport>>({
        kind: Nettstatus.IkkeLastet,
    });

    useEffect(() => {
        const hentAvviksrapport = async () => {
            setAvviksrapport(await get<Avviksrapport>(`${api.kandidat}/avvik/${kandidatlisteId}`));
        };

        hentAvviksrapport();
    }, [kandidatlisteId]);

    return (
        <>
            {avviksrapport.kind === Nettstatus.Suksess && (
                <div className={css.gjennomgått}>
                    <CheckmarkCircleIcon aria-hidden />
                    <div>
                        <Label as="span">Listen ble gjennomgått for personveravvik</Label>
                        <BodyShort>{formaterDatoNaturlig(avviksrapport.data.tidspunkt)}</BodyShort>
                    </div>
                </div>
            )}
            {avviksrapport.kind === Nettstatus.FinnesIkke && (
                <Button
                    variant="secondary"
                    onClick={() => setVisAvviksrapporteringModal(true)}
                    icon={<HikingTrailSignIcon aria-hidden />}
                >
                    Rapporter personvernavvik
                </Button>
            )}
            <AvviksrapporteringModal
                kandidatlisteId={kandidatlisteId}
                vis={visAvviksrapporteringModal}
                onLagreAvvik={setAvviksrapport}
                onClose={() => setVisAvviksrapporteringModal(false)}
            />
        </>
    );
};

export default Avviksrapportering;
