import { CheckmarkIcon } from '@navikt/aksel-icons';
import { Checkbox } from '@navikt/ds-react';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { alleInnsatsgrupper } from '../../filter/Jobbmuligheter';
import { KontekstAvKandidatlisteEllerStilling } from '../../hooks/useKontekstAvKandidatlisteEllerStilling';
import useScrollTilKandidat from '../../hooks/useScrollTilKandidat';
import { lenkeTilKandidat, storForbokstav } from '../../utils';
import { Økt } from '../../Økt';
import css from './Kandidatrad.module.css';
import RekBisKortKandidat from './kandidatkort/RekBisKortKandidat';

type Props = {
    kandidat: Kandidat;
    markerteKandidater: Set<string>;
    onMarker: () => void;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
    forrigeØkt: Økt | null;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    onMarker,
    kontekstAvKandidatlisteEllerStilling,
    forrigeØkt,
}) => {
    const fremhevet = kandidat.arenaKandidatnr === forrigeØkt?.sistBesøkteKandidat;
    const markert = markerteKandidater.has(kandidat.arenaKandidatnr);

    useScrollTilKandidat(kandidat.arenaKandidatnr, forrigeØkt?.sistBesøkteKandidat);

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

    const kandidatAlleredeLagtTilPåKandidatlista =
        kontekstAvKandidatlisteEllerStilling?.kandidatliste.kind === Nettstatus.Suksess
            ? kandidatenErPåKandidatlista(
                  kandidat,
                  kontekstAvKandidatlisteEllerStilling.kandidatliste.data
              )
            : false;

    const kandidatlisteId =
        kontekstAvKandidatlisteEllerStilling?.kandidatliste.kind === Nettstatus.Suksess
            ? kontekstAvKandidatlisteEllerStilling.kandidatliste.data.kandidatlisteId
            : undefined;
    return (
        <RekBisKortKandidat
            markert={markert}
            fremhevet={fremhevet}
            kandidatPåListe={
                kandidatAlleredeLagtTilPåKandidatlista && (
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
            kandidatnummer={kandidat.kandidatnr}
            checkbox={
                <Checkbox
                    hideLabel
                    value={kandidat}
                    checked={markert}
                    onChange={onMarker}
                    disabled={kandidatAlleredeLagtTilPåKandidatlista}
                >
                    Valgt
                </Checkbox>
            }
            kandidat={
                <Link to={lenkeTilKandidat(kandidat.arenaKandidatnr, kandidatlisteId)}>
                    {hentKandidatensNavn(kandidat)}
                </Link>
            }
            ønsker={alleØnskedeYrker ?? '-'}
            lokasjon={alleØnskedeSteder ?? '-'}
            innsatsgruppe={alleInnsatsgrupper[kandidat.kvalifiseringsgruppekode].label}
            bosted={`${kandidat.kommunenummerstring ?? '-'} ${kandidat.kommuneNavn ?? '-'}`}
            veilder={kandidat.veilederVisningsnavn ?? '-'}
        />
    );
};

const kandidatenErPåKandidatlista = (kandidat: Kandidat, kandidatliste: Kandidatliste): boolean => {
    return kandidatliste.kandidater.some((kandidatPåLista) => {
        return kandidatPåLista.kandidatnr === kandidat.arenaKandidatnr;
    });
};

export const hentKandidatensNavn = (kandidat: Kandidat) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const hentKandidatensØnskedeYrker = (kandidat: Kandidat) =>
    kandidat.yrkeJobbonskerObj.length === 0
        ? undefined
        : kandidat.yrkeJobbonskerObj.map((jobbønske) => jobbønske.styrkBeskrivelse).join(', ');

const hentKandidatensØnskedeSteder = (kandidat: Kandidat) =>
    kandidat.geografiJobbonsker.length === 0
        ? undefined
        : kandidat.geografiJobbonsker.map((jobbønske) => jobbønske.geografiKodeTekst).join(', ');

export default Kandidatrad;
