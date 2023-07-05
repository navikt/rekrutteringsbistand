import { FunctionComponent, useState } from 'react';
import { MagnifyingGlassIcon, PersonPlusIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { State } from '../../redux/store';
import { stillingenHarKandidatliste } from '../adUtils';
import { sendGenerellEvent } from 'felles/amplitude';
import LeggTilKandidatModal from '../legg-til-kandidat-modal/LeggTilKandidatModal';
import css from './Kandidathandlinger.module.css';
import Stilling from '../../domene/Stilling';

type Props = {
    kandidatliste: Nettressurs<Kandidatliste>;
};

const Kandidathandlinger: FunctionComponent<Props> = ({ kandidatliste }) => {
    const stillingsdata = useSelector((state: State) => state.adData) as Stilling;
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const [visLeggTilKandidatModal, setVisLeggTilKandidatModal] = useState(false);

    const onSeKandidatlisteClick = () => {
        sendGenerellEvent('knapp', {
            label: 'Se kandidater',
        });
    };

    const toggleLeggTilKandidatModal = () => {
        setVisLeggTilKandidatModal(!visLeggTilKandidatModal);
    };

    const visHandlingerKnyttetTilKandidatlisten = stillingenHarKandidatliste(
        stillingsinfo.eierNavident,
        stillingsdata.publishedByAdmin,
        stillingsdata.source
    );

    const kandidatlisteId =
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.kandidatlisteId : '';

    return (
        <div className={css.kandidathandlinger}>
            <LeggTilKandidatModal
                vis={visLeggTilKandidatModal}
                onClose={toggleLeggTilKandidatModal}
                kandidatliste={kandidatliste}
            />
            {visHandlingerKnyttetTilKandidatlisten && (
                <>
                    <Link
                        className="navds-link"
                        to={`/kandidatsok?kandidatliste=${kandidatlisteId}&brukKriterierFraStillingen=true`}
                    >
                        <MagnifyingGlassIcon />
                        Finn kandidater
                    </Link>
                    <button
                        className={classNames('navds-link', css.leggTilKandidatKnapp)}
                        onClick={toggleLeggTilKandidatModal}
                    >
                        <PersonPlusIcon />
                        Legg til kandidat
                    </button>
                    <Link
                        className="navds-link"
                        to={`/kandidater/lister/stilling/${stillingsdata.uuid}/detaljer`}
                        onClick={onSeKandidatlisteClick}
                    >
                        <PersonGroupIcon />
                        Se kandidatliste
                    </Link>
                </>
            )}
        </div>
    );
};

export default Kandidathandlinger;
