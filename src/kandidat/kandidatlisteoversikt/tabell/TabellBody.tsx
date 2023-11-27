import { Table } from '@navikt/ds-react';
import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { FunctionComponent } from 'react';
import { harTilgangTilkandidatliste } from '../../kandidatliste/domene/kandidatlisteUtils';
import TabellRad from './TabellRad';

type Props = {
    kandidatlister: KandidatlisteSammendrag[];
    onRedigerClick: (kandidatliste: KandidatlisteSammendrag) => void;
    onMarkerSomMinClick: (kandidatliste: KandidatlisteSammendrag) => void;
    onSlettClick: (kandidatliste: KandidatlisteSammendrag) => void;
};

const TabellBody: FunctionComponent<Props> = ({
    kandidatlister,
    onRedigerClick,
    onMarkerSomMinClick,
    onSlettClick,
}) => {
    return (
        <Table.Body>
            {kandidatlister.map((kandidatliste) => (
                <TabellRad
                    key={kandidatliste.kandidatlisteId}
                    kandidatlisteSammendrag={kandidatliste}
                    onRedigerClick={() => onRedigerClick(kandidatliste)}
                    onMarkerSomMinClick={() => onMarkerSomMinClick(kandidatliste)}
                    onSlettClick={() => onSlettClick(kandidatliste)}
                    harTilgang={harTilgangTilkandidatliste(kandidatliste)}
                />
            ))}
        </Table.Body>
    );
};

export default TabellBody;
