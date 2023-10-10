import {
    HikingTrailSignIcon,
    MagnifyingGlassIcon,
    PersonPlusIcon,
    CheckmarkCircleIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import classNames from 'classnames';
import { erIkkeProd } from 'felles/miljø';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { lenkeTilFinnKandidater } from '../../app/paths';
import css from './Meny.module.css';
import { api, get } from 'felles/api';
import { Avviksrapport } from 'felles/domene/kandidatliste/Avviksrapport';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { formaterDatoNaturlig } from '../../utils/dateUtils';

interface Props {
    border?: boolean;
    kandidatlisteId: string;
    stillingId: string | null;
    onLeggTilKandidat: () => void;
    onRapporterAvvik?: () => void;
}

const Meny: FunctionComponent<Props> = ({
    border,
    kandidatlisteId,
    stillingId,
    onLeggTilKandidat,
    onRapporterAvvik,
}) => {
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
            {erIkkeProd && onRapporterAvvik && (
                <>
                    {avviksrapport.kind === Nettstatus.Suksess && (
                        <div className={css.gjennomgått}>
                            <CheckmarkCircleIcon aria-hidden />
                            <div>
                                <Label as="span">Listen ble gjennomgått for personvernsbrudd</Label>
                                <BodyShort>
                                    {formaterDatoNaturlig(avviksrapport.data.tidspunkt)}
                                </BodyShort>
                            </div>
                        </div>
                    )}
                    {avviksrapport.kind === Nettstatus.FinnesIkke && (
                        <Button
                            variant="secondary"
                            onClick={onRapporterAvvik}
                            icon={<HikingTrailSignIcon aria-hidden />}
                            className={css.rapporterAvvik}
                        >
                            Rapporter avvik
                        </Button>
                    )}
                </>
            )}
        </div>
    );
};

export default Meny;
