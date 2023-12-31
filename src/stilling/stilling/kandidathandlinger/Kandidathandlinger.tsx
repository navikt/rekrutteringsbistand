import { MagnifyingGlassIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Stilling from 'felles/domene/stilling/Stilling';
import { State } from '../../redux/store';
import { stillingenHarKandidatliste } from '../adUtils';
import LeggTilKandidatModal from '../legg-til-kandidat-modal/LeggTilKandidatModal';
import css from './Kandidathandlinger.module.css';
import { BodyShort, Loader } from '@navikt/ds-react';

type Props = {
    kandidatlisteId: string;
    erEier: boolean;
};

const Kandidathandlinger: FunctionComponent<Props> = ({ erEier, kandidatlisteId }) => {
    const stillingsdata = useSelector((state: State) => state.adData) as Stilling;
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const [visLeggTilKandidatModal, setVisLeggTilKandidatModal] = useState(false);

    const toggleLeggTilKandidatModal = () => {
        setVisLeggTilKandidatModal(!visLeggTilKandidatModal);
    };

    const visHandlingerKnyttetTilKandidatlisten = stillingenHarKandidatliste(
        stillingsinfo.eierNavident,
        stillingsdata.publishedByAdmin,
        stillingsdata.source
    );

    return (
        <div className={css.kandidathandlinger}>
            <LeggTilKandidatModal
                vis={visLeggTilKandidatModal}
                onClose={toggleLeggTilKandidatModal}
                stillingsId={stillingsdata.uuid}
            />
            {visHandlingerKnyttetTilKandidatlisten && (
                <>
                    {erEier &&
                        (kandidatlisteId ? (
                            <Link
                                className="navds-link"
                                to={`/kandidatsok?kandidatliste=${kandidatlisteId}&brukKriterierFraStillingen=true`}
                            >
                                <MagnifyingGlassIcon />
                                Finn kandidater
                            </Link>
                        ) : (
                            <BodyShort className="navds-link" style={{ color: 'inherit' }}>
                                <Loader />
                                Finn kandidater
                            </BodyShort>
                        ))}
                    <button
                        className={classNames('navds-link', css.leggTilKandidatKnapp)}
                        onClick={toggleLeggTilKandidatModal}
                    >
                        <PersonPlusIcon />
                        Legg til kandidat
                    </button>
                </>
            )}
        </div>
    );
};

export default Kandidathandlinger;
