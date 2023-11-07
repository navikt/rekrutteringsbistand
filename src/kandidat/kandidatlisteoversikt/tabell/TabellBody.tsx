import { Table } from '@navikt/ds-react';
import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import useInnloggetBruker from 'felles/hooks/useInnloggetBruker';
import { FunctionComponent } from 'react';
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
    const { navIdent } = useInnloggetBruker(null);

    return (
        <Table.Body>
            {kandidatlister.map((kandidatliste) => (
                <TabellRad
                    key={kandidatliste.kandidatlisteId}
                    kandidatlisteSammendrag={kandidatliste}
                    onRedigerClick={() => onRedigerClick(kandidatliste)}
                    onMarkerSomMinClick={() => onMarkerSomMinClick(kandidatliste)}
                    onSlettClick={() => onSlettClick(kandidatliste)}
                    harTilgang={navIdent === kandidatliste.opprettetAv.ident}
                />
            ))}
        </Table.Body>
    );
};

export default TabellBody;
