import { BodyLong } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import Sidelaster from '../../../../felles/komponenter/sidelaster/Sidelaster';
import { Notat } from '../../domene/Kandidatressurser';
import NotatInfo from './NotatInfo';
import css from './Notatliste.module.css';

interface Props {
    notater: Nettressurs<Notat[]>;
    onOpenRedigeringsModal: (notat: Notat) => void;
    onOpenSletteModal: (notat: Notat) => void;
}

const Notatliste: FunctionComponent<Props> = ({
    notater,
    onOpenRedigeringsModal,
    onOpenSletteModal,
}) => {
    if (notater?.kind === Nettstatus.LasterInn) {
        return <Sidelaster size="large" />;
    }

    if (notater?.kind === Nettstatus.Suksess && notater.data.length !== 0) {
        return (
            <>
                {notater.data.map((notat) => (
                    <div className={css.rad} key={notat.notatId}>
                        <div className={css.topprad}>
                            <NotatInfo notat={notat} />
                            {/* {notat.kanEditere && (
                                <div className={css.knapper}>
                                    <Button
                                        variant="tertiary"
                                        onClick={() => {
                                            onOpenRedigeringsModal(notat);
                                        }}
                                        icon={<PencilIcon aria-label="Endre notat" />}
                                    />
                                    <Button
                                        variant="tertiary"
                                        onClick={() => {
                                            onOpenSletteModal(notat);
                                        }}
                                        icon={<TrashIcon aria-label="Slett notat" />}
                                    />
                                </div>
                            )} */}
                        </div>
                        <BodyLong>{notat.tekst}</BodyLong>
                    </div>
                ))}
            </>
        );
    }

    return null;
};

export default Notatliste;
