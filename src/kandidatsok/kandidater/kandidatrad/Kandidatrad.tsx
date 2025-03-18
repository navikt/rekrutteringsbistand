import { CheckmarkIcon } from '@navikt/aksel-icons';
import { Checkbox } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { KandidatsøkKandidat } from '../../../api/kandidat-søk-api/kandidatsøk';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { alleInnsatsgrupper } from '../../filter/Jobbmuligheter';
import useScrollTilKandidat from '../../hooks/useScrollTilKandidat';
import { lenkeTilKandidat, storForbokstav } from '../../utils';
import css from './Kandidatrad.module.css';
import RekBisKortKandidat from './kandidatkort/RekBisKortKandidat';

type Props = {
    kandidat: KandidatsøkKandidat;
    markerteKandidater: Set<string>;
    onMarker: () => void;
    stillingId: string | null;
    erIListen: boolean;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    onMarker,
    stillingId,
    erIListen,
}) => {
    const { kandidatSøkØkt } = useContext(KandidatSøkContext);
    const fremhevet = kandidat.arenaKandidatnr === kandidatSøkØkt?.forrigeØkt?.sistBesøkteKandidat;
    const markert = markerteKandidater.has(kandidat.arenaKandidatnr);

    useScrollTilKandidat(kandidat.arenaKandidatnr, kandidatSøkØkt?.forrigeØkt?.sistBesøkteKandidat);

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

    return (
        <RekBisKortKandidat
            markert={markert}
            fremhevet={fremhevet}
            kandidatPåListe={
                erIListen && (
                    <div className={css.kandidatPåListeWrapper}>
                        <div
                            title="Kandidater er allerede lagt til på kandidatlisten"
                            className={css.kandidatPåListe}
                        >
                            <CheckmarkIcon />
                        </div>
                    </div>
                )
            }
            kandidatnummer={kandidat.arenaKandidatnr}
            checkbox={
                <Checkbox
                    hideLabel
                    value={kandidat}
                    checked={markert}
                    onChange={onMarker}
                    disabled={erIListen}
                >
                    Valgt
                </Checkbox>
            }
            kandidat={
                <Link
                    className={classNames(css.lenke, 'navds-link')}
                    to={lenkeTilKandidat(kandidat.arenaKandidatnr, stillingId)}
                >
                    {hentKandidatensNavn(kandidat)}
                </Link>
            }
            ønsker={alleØnskedeYrker ?? '-'}
            lokasjon={alleØnskedeSteder ?? '-'}
            innsatsgruppe={alleInnsatsgrupper[kandidat.innsatsgruppe].label}
            bosted={`${kandidat.postnummer ?? '-'} ${kandidat.kommuneNavn ?? '-'}`}
        />
    );
};

export const hentKandidatensNavn = (kandidat: KandidatsøkKandidat) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const hentKandidatensØnskedeYrker = (kandidat: KandidatsøkKandidat) =>
    kandidat.yrkeJobbonskerObj.length === 0
        ? undefined
        : kandidat.yrkeJobbonskerObj.map((jobbønske) => jobbønske.styrkBeskrivelse).join(', ');

const hentKandidatensØnskedeSteder = (kandidat: KandidatsøkKandidat) =>
    kandidat.geografiJobbonsker.length === 0
        ? undefined
        : kandidat.geografiJobbonsker.map((jobbønske) => jobbønske.geografiKodeTekst).join(', ');

export default Kandidatrad;
