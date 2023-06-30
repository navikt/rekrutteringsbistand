import { FunctionComponent } from 'react';
import { BodyShort, Button, Table, Dropdown } from '@navikt/ds-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatISOString } from '../../utils/datoUtils';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { MenuElipsisHorizontalCircleIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import {
    RekrutteringsbistandstillingOpenSearch,
    stillingErUtløpt,
} from '../../domene/StillingOpenSearch';
import { State } from '../../redux/store';
import DropdownMeny from './DropdownMeny';
import getEmployerName from '../../common/getEmployerName';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import css from './MineStillingerTabell.module.css';

type Props = {
    rekrutteringsbistandstilling: RekrutteringsbistandstillingOpenSearch;
};

const TabellRad: FunctionComponent<Props> = ({ rekrutteringsbistandstilling }) => {
    const reportee = useSelector((state: State) => state.reportee.data);
    const copiedAds = useSelector((state: State) => state.ad.copiedAds);

    const { stilling, stillingsinfo } = rekrutteringsbistandstilling;

    const isCopy = copiedAds.includes(stilling.uuid);

    const isTransferredToOther =
        stillingsinfo &&
        stillingsinfo.eierNavident &&
        stilling.administration &&
        stilling.administration.navIdent !== stillingsinfo.eierNavident &&
        reportee &&
        stillingsinfo.eierNavident !== reportee.navIdent;

    const colTitle = (
        <Table.DataCell>
            <Link className="navds-link" to={`/stillinger/stilling/${stilling.uuid}`}>
                {isCopy
                    ? (
                          <div>
                              <b>{stilling.title.substring(0, 5)}</b>
                              {stilling.title.substring(5)}
                          </div>
                      ) || ''
                    : stilling.title || ''}
            </Link>
        </Table.DataCell>
    );

    const colUpdated = (
        <Table.DataCell>
            {stilling.updated && (
                <BodyShort className="ResultItem__column">
                    {formatISOString(stilling.updated, 'DD.MM.YYYY')}
                </BodyShort>
            )}
        </Table.DataCell>
    );

    if (isTransferredToOther) {
        return (
            <Table.Row>
                {colUpdated}
                {colTitle}
                <Table.DataCell>
                    <BodyShort>Overført til annen veileder.</BodyShort>
                </Table.DataCell>
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
            </Table.Row>
        );
    }

    return (
        <Table.Row shadeOnHover={false} className={css.rad}>
            {colUpdated}
            {colTitle}
            <Table.DataCell>
                {stilling.annonsenr && <BodyShort>{stilling.annonsenr}</BodyShort>}
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort className="ResultItem__column Col-employer-inner">
                    {getEmployerName(stilling)}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                {stilling.expires && <BodyShort>{formatISOString(stilling.expires)}</BodyShort>}
            </Table.DataCell>
            <Table.DataCell>
                {stilling.privacy && (
                    <BodyShort className="ResultItem__column">
                        {stilling.privacy === PrivacyStatusEnum.SHOW_ALL
                            ? 'Arbeidsplassen'
                            : 'Internt'}
                    </BodyShort>
                )}
            </Table.DataCell>
            <Table.DataCell>
                {stilling.status && (
                    <BodyShort className="ResultItem__column">
                        {getAdStatusLabel(stilling.status, stillingErUtløpt(stilling))}
                    </BodyShort>
                )}
            </Table.DataCell>
            <Table.DataCell align="center" className={css.ikkeWrapTekst}>
                {stilling.publishedByAdmin && (
                    <Link
                        to={`/kandidater/lister/stilling/${stilling.uuid}/detaljer`}
                        className="navds-link"
                    >
                        <PersonGroupIcon />
                        Se kandidatliste
                    </Link>
                )}
            </Table.DataCell>
            <Table.DataCell align="center">
                <Dropdown closeOnSelect={false}>
                    <Button
                        as={Dropdown.Toggle}
                        variant="tertiary"
                        icon={<MenuElipsisHorizontalCircleIcon />}
                        aria-label="Meny for stilling"
                    />
                    <DropdownMeny stilling={stilling} />
                </Dropdown>
            </Table.DataCell>
        </Table.Row>
    );
};

export default TabellRad;
