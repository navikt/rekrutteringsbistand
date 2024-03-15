import { Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import { KandidatlisteForKandidat } from 'felles/domene/kandidatliste/Kandidatliste';
import { Sms, useSmserForKandidat } from '../../../../api/sms-api/sms';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { ForespørselOmDelingAvCv } from '../../../kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { Historikkrad } from './Historikkrad/Historikkrad';
import { useLookupCv } from '../../../../api/kandidat-søk-api/lookupCv';
import { useParams } from 'react-router-dom';

interface Props {
    kandidatlister: KandidatlisteForKandidat[];
    aktivKandidatlisteId: string | null;
    forespørslerOmDelingAvCvForKandidat: Nettressurs<ForespørselOmDelingAvCv[]>;
}

export const Historikktabell: FunctionComponent<Props> = ({
    kandidatlister,
    aktivKandidatlisteId,
    forespørslerOmDelingAvCvForKandidat,
}) => {
    const { kandidatnr } = useParams<{ kandidatnr: string }>();
    const { cv } = useLookupCv(kandidatnr);
    const { data: smser } = useSmserForKandidat({ fnr: cv?.fodselsnummer });
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Lagt i listen</Table.HeaderCell>
                    <Table.HeaderCell>Navn på kandidatliste</Table.HeaderCell>
                    <Table.HeaderCell>Arbeidsgiver</Table.HeaderCell>
                    <Table.HeaderCell>Lagt til av</Table.HeaderCell>
                    <Table.HeaderCell>Status/hendelser</Table.HeaderCell>
                    <Table.HeaderCell>Stilling</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {kandidatlister.map((liste) => (
                    <Historikkrad
                        key={liste.uuid}
                        kandidatliste={liste}
                        aktiv={liste.uuid === aktivKandidatlisteId}
                        forespørselOmDelingAvCv={finnForespørselOmDelingAvCv(
                            forespørslerOmDelingAvCvForKandidat,
                            liste
                        )}
                        sms={finnSms(smser, liste.stillingId)}
                    />
                ))}
            </Table.Body>
        </Table>
    );
};

export const finnForespørselOmDelingAvCv = (
    forespørslerOmDelingAvCv: Nettressurs<ForespørselOmDelingAvCv[]>,
    kandidatliste: KandidatlisteForKandidat
) => {
    if (forespørslerOmDelingAvCv.kind !== Nettstatus.Suksess) {
        return undefined;
    }

    return forespørslerOmDelingAvCv.data.find(
        (forespørsel) => forespørsel.stillingsId === kandidatliste.stillingId
    );
};

const finnSms = (smser: Sms[] | undefined, stillingId: string | undefined) => {
    if (smser === undefined || stillingId === undefined) {
        return undefined;
    }
    return smser.find((sms) => sms.stillingId === stillingId);
};
