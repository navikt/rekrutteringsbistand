import { MenuElipsisHorizontalCircleIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Dropdown, Table, Tooltip } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { lenkeTilFinnKandidater, lenkeTilKandidatliste } from '../../app/paths';
import { formaterDato } from '../../utils/dateUtils';
import Dropdownmeny from './Dropdownmeny';
import css from './Kandidatlistetabell.module.css';
import Redigerknapp from './Redigerknapp';

export type FeilmeldingIMeny = {
    anker?: HTMLElement;
    feilmelding?: ReactNode;
};

type Props = {
    kandidatlisteSammendrag: KandidatlisteSammendrag;
    onRedigerClick: () => void;
    onMarkerSomMinClick: () => void;
    onSlettClick: () => void;
    harTilgang: boolean;
};

const TabellRad: FunctionComponent<Props> = ({
    kandidatlisteSammendrag,
    onRedigerClick,
    onMarkerSomMinClick,
    onSlettClick,
    harTilgang,
}) => {
    return (
        <Table.Row shadeOnHover={false} className={css.rad}>
            <Table.DataCell>
                <BodyShort>{`${formaterDato(
                    kandidatlisteSammendrag.opprettetTidspunkt,
                    'numeric'
                )}`}</BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                {harTilgang ? (
                    <Link
                        to={lenkeTilKandidatliste(kandidatlisteSammendrag.kandidatlisteId)}
                        className="navds-link"
                    >
                        {kandidatlisteSammendrag.tittel}
                    </Link>
                ) : (
                    <BodyShort>{kandidatlisteSammendrag.tittel}</BodyShort>
                )}
            </Table.DataCell>
            <Table.DataCell align="right" className={css.antallKandidater}>
                <BodyShort>{kandidatlisteSammendrag.antallKandidater}</BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort>{`${kandidatlisteSammendrag.opprettetAv.navn} (${kandidatlisteSammendrag.opprettetAv.ident})`}</BodyShort>
            </Table.DataCell>
            <Table.DataCell align="center">
                {harTilgang ? (
                    <Link
                        aria-label={`Finn kandidater til listen «${kandidatlisteSammendrag.tittel}»`}
                        to={lenkeTilFinnKandidater(
                            kandidatlisteSammendrag.stillingId,
                            kandidatlisteSammendrag.kandidatlisteId,
                            true
                        )}
                    >
                        <Button variant="tertiary" as="div" icon={<PersonPlusIcon />} />
                    </Link>
                ) : (
                    <Tooltip content="Du kan ikke finne kandidater for en kandidatliste som ikke er din.">
                        <Button
                            variant="tertiary"
                            className={css.disabledValg}
                            icon={<PersonPlusIcon />}
                        />
                    </Tooltip>
                )}
            </Table.DataCell>
            <Table.DataCell align="center">
                <Redigerknapp kandidatliste={kandidatlisteSammendrag} onClick={onRedigerClick} />
            </Table.DataCell>
            <Table.DataCell align="center">
                <Dropdown closeOnSelect={false}>
                    <Button
                        as={Dropdown.Toggle}
                        variant="tertiary"
                        icon={<MenuElipsisHorizontalCircleIcon />}
                        aria-label={`Meny for kandidatlisten ${kandidatlisteSammendrag.tittel}`}
                    />
                    <Dropdown.Menu>
                        <Dropdownmeny
                            kandidatliste={kandidatlisteSammendrag}
                            onMarkerSomMinClick={onMarkerSomMinClick}
                            onSlettClick={onSlettClick}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Table.DataCell>
        </Table.Row>
    );
};

export default TabellRad;
