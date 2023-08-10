import { Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import { KandidatlisteForKandidat } from 'felles/domene/kandidatliste/Kandidatliste';
import { Sms } from 'felles/domene/sms/Sms';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { ForespørselOmDelingAvCv } from '../../../kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { Historikkrad } from './Historikkrad/Historikkrad';

interface Props {
    kandidatlister: KandidatlisteForKandidat[];
    aktivKandidatlisteId: string | null;
    forespørslerOmDelingAvCvForKandidat: Nettressurs<ForespørselOmDelingAvCv[]>;
    smser: Nettressurs<Sms[]>;
}

export const Historikktabell: FunctionComponent<Props> = ({
    kandidatlister,
    aktivKandidatlisteId,
    forespørslerOmDelingAvCvForKandidat,
    smser,
}) => (
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
            {kandidatlister.map((liste, i) => (
                <Historikkrad
                    key={liste.uuid}
                    kandidatliste={liste}
                    aktiv={liste.uuid === aktivKandidatlisteId}
                    forespørselOmDelingAvCv={finnForespørselOmDelingAvCv(
                        forespørslerOmDelingAvCvForKandidat,
                        liste
                    )}
                    sms={finnSms(smser, liste.uuid)}
                />
            ))}
        </Table.Body>
    </Table>
);

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

const finnSms = (sms: Nettressurs<Sms[]>, kandidatlisteId: string) => {
    if (sms.kind !== Nettstatus.Suksess) {
        return undefined;
    }
    return sms.data.find((sms) => sms.kandidatlisteId === kandidatlisteId);
};
