import {
    CheckmarkCircleIcon,
    HikingTrailSignIcon,
    MagnifyingGlassIcon,
    PersonPlusIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import classNames from 'classnames';
import { api, get } from 'felles/api';
import { Avviksrapport } from 'felles/domene/kandidatliste/Avviksrapport';
import { erIkkeProd } from 'felles/miljø';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { lenkeTilFinnKandidater } from '../../app/paths';
import { formaterDatoNaturlig } from '../../utils/dateUtils';
import AvviksrapporteringModal from '../modaler/avviksrapportering-modal/AvviksrapporteringModal';
import css from './Meny.module.css';

type Props = {
    border?: boolean;
    kandidatlisteId: string;
    stillingId: string | null;
    onLeggTilKandidat: () => void;
    visAvviksrapportering?: boolean;
};

const Meny: FunctionComponent<Props> = ({
    border,
    kandidatlisteId,
    stillingId,
    onLeggTilKandidat,
    visAvviksrapportering,
}) => {
    const [visAvviksrapporteringModal, setVisAvviksrapporteringModal] = useState<boolean>(false);
    const [avviksrapport, setAvviksrapport] = useState<Nettressurs<Avviksrapport>>({
        kind: Nettstatus.IkkeLastet,
    });

    useEffect(() => {
        const hentAvviksrapport = async () => {
            setAvviksrapport(await get<Avviksrapport>(`${api.kandidat}/avvik/${kandidatlisteId}`));
        };
        if (erIkkeProd) hentAvviksrapport();
    }, [kandidatlisteId]);

    return (
        <div
            className={classNames(css.meny, {
                [css.border]: border,
            })}
        >
            <Link to={lenkeTilFinnKandidater(stillingId, kandidatlisteId, true)}>
                <Button variant="tertiary" as="div" icon={<MagnifyingGlassIcon aria-hidden />}>
                    Finn kandidater
                </Button>
            </Link>

            <Button
                variant="tertiary"
                onClick={onLeggTilKandidat}
                icon={<PersonPlusIcon aria-hidden />}
            >
                Legg til kandidat
            </Button>
            {erIkkeProd && visAvviksrapportering && (
                <>
                    {avviksrapport.kind === Nettstatus.Suksess && (
                        <div className={css.gjennomgått}>
                            <CheckmarkCircleIcon aria-hidden />
                            <div>
                                <Label as="span">Listen ble gjennomgått for personveravvik</Label>
                                <BodyShort>
                                    {formaterDatoNaturlig(avviksrapport.data.tidspunkt)}
                                </BodyShort>
                            </div>
                        </div>
                    )}
                    {avviksrapport.kind === Nettstatus.FinnesIkke && (
                        <Button
                            variant="secondary"
                            onClick={() => setVisAvviksrapporteringModal(true)}
                            icon={<HikingTrailSignIcon aria-hidden />}
                            className={css.rapporterAvvik}
                        >
                            Rapporter personvernavvik
                        </Button>
                    )}
                </>
            )}
            <AvviksrapporteringModal
                kandidatlisteId={kandidatlisteId}
                vis={visAvviksrapporteringModal}
                onLagreAvvik={setAvviksrapport}
                onClose={() => setVisAvviksrapporteringModal(false)}
            />
        </div>
    );
};

export default Meny;
