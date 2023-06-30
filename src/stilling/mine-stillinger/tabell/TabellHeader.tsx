import { FunctionComponent } from 'react';
import { Table } from '@navikt/ds-react';
import { MineStillingerSorteringsfelt } from '../MineStillingerSortering';
import css from './MineStillingerTabell.module.css';

const TabellHeader: FunctionComponent = () => {
    return (
        <Table.Header>
            <Table.Row className={css.ikkeWrapTekst}>
                <Table.ColumnHeader
                    sortable
                    sortKey={MineStillingerSorteringsfelt.SistEndretTidspunkt}
                >
                    Sist endret
                </Table.ColumnHeader>
                <Table.HeaderCell scope="col">Stillingstittel</Table.HeaderCell>
                <Table.HeaderCell scope="col">Annonsenr.</Table.HeaderCell>
                <Table.HeaderCell scope="col">Arbeidsgiver</Table.HeaderCell>
                <Table.ColumnHeader sortable sortKey={MineStillingerSorteringsfelt.Utløpsdato}>
                    Utløpsdato
                </Table.ColumnHeader>
                <Table.ColumnHeader sortable sortKey={MineStillingerSorteringsfelt.Publisert}>
                    Publisert
                </Table.ColumnHeader>
                <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                <Table.HeaderCell scope="col" align="center">
                    Kandidatliste
                </Table.HeaderCell>
                <Table.HeaderCell scope="col" align="center">
                    Handlinger
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
};

export default TabellHeader;
