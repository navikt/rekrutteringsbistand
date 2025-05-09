import { LinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Detail, Table } from '@navikt/ds-react';
import classNames from 'classnames';
import moment from 'moment';
import { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { KandidatlisteForKandidat } from 'felles/domene/kandidatliste/Kandidatliste';
import { Sms } from '../../../../../api/kandidatvarsel-api/kandidatvarsel';
import useHentStilling from '../../../../../felles/hooks/useStilling';
import { lenkeTilStilling } from '../../../../../felles/lenker';
import Hendelsesetikett from '../../../../kandidatliste/kandidatrad/status-og-hendelser/etiketter/Hendelsesetikett';
import StatusEtikett from '../../../../kandidatliste/kandidatrad/status-og-hendelser/etiketter/StatusEtikett';
import { ForespørselOmDelingAvCv } from '../../../../kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { capitalizeEmployerName } from '../../../../utils/formateringUtils';
import css from './Historikkrad.module.css';

interface Props {
    kandidatliste: KandidatlisteForKandidat;
    aktiv: boolean;
    forespørselOmDelingAvCv?: ForespørselOmDelingAvCv;
    sms?: Sms;
}

export const Historikkrad: FunctionComponent<Props> = ({
    kandidatliste,
    aktiv,
    forespørselOmDelingAvCv,
    sms,
}) => {
    let tittel: ReactNode = null;

    const { isError, stilling } = useHentStilling(kandidatliste.stillingId);

    const stillingsTittel = isError
        ? 'klarte ikke hente tittel ...'
        : stilling?.stilling?.title ?? 'laster ...';

    const listeTittel = kandidatliste.stillingId ? stillingsTittel : kandidatliste.tittel;

    tittel = kandidatliste.slettet ? (
        <>
            <BodyShort as="span">{listeTittel} </BodyShort>
            <Detail as="span" className={css.slettet}>
                (slettet)
            </Detail>
        </>
    ) : (
        <BodyShort as="span">{listeTittel} </BodyShort>
    );

    const skalViseLenkeTilStilling = !kandidatliste.slettet;

    return (
        <Table.Row shadeOnHover={false} selected={aktiv} key={kandidatliste.uuid}>
            <Table.DataCell>
                {moment(kandidatliste.lagtTilTidspunkt).format('DD.MM.YYYY')}
            </Table.DataCell>
            <Table.DataCell>{tittel}</Table.DataCell>
            <Table.DataCell>
                {kandidatliste.organisasjonNavn
                    ? capitalizeEmployerName(kandidatliste.organisasjonNavn)
                    : ''}
            </Table.DataCell>
            <Table.DataCell>
                {kandidatliste.lagtTilAvNavn} ({kandidatliste.lagtTilAvIdent})
            </Table.DataCell>
            <Table.DataCell>
                <div className={css.statusOgHendelser}>
                    <StatusEtikett status={kandidatliste.status} />
                    <Hendelsesetikett
                        utfall={kandidatliste.utfall}
                        utfallsendringer={kandidatliste.utfallsendringer}
                        forespørselOmDelingAvCv={forespørselOmDelingAvCv}
                        sms={sms}
                    />
                </div>
            </Table.DataCell>
            <Table.DataCell className="historikkrad__stilling">
                {skalViseLenkeTilStilling && kandidatliste.stillingId && (
                    <Lenke to={lenkeTilStilling({ stillingsId: kandidatliste.stillingId })}>
                        Se stilling
                    </Lenke>
                )}
            </Table.DataCell>
        </Table.Row>
    );
};

const Lenke = ({ to, children }: { to: string; children: ReactNode }) => (
    <Link to={to} className={classNames(css.lenke, 'navds-link')}>
        {children}
        <LinkIcon />
    </Link>
);
