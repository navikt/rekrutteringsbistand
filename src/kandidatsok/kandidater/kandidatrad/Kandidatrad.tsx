import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Detail } from '@navikt/ds-react';

import { alleInnsatsgrupper } from '../../filter/Jobbmuligheter';
import { CheckmarkIcon, HeartIcon, PinIcon } from '@navikt/aksel-icons';
import { EsKandidat } from 'felles/domene/kandidat/EsKandidat';
import { KontekstAvKandidatlisteEllerStilling } from '../../hooks/useKontekstAvKandidatlisteEllerStilling';
import { lenkeTilKandidat, storForbokstav } from '../../utils';
import { Nettstatus } from 'felles/nettressurs';
import { Økt } from '../../Økt';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import TekstlinjeMedIkon from './TekstlinjeMedIkon';
import useScrollTilKandidat from '../../hooks/useScrollTilKandidat';
import css from './Kandidatrad.module.css';

type Props = {
    kandidat: EsKandidat;
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
        <div
            id={`kandidatrad-${kandidat.arenaKandidatnr}`}
            className={css.kandidatrad + (fremhevet ? ' ' + css.fremhevetKandidatrad : '')}
            key={kandidat.fodselsnummer}
            aria-selected={markert}
        >
            <Checkbox
                hideLabel
                value={kandidat}
                checked={markert}
                onChange={onMarker}
                disabled={kandidatAlleredeLagtTilPåKandidatlista}
            >
                Valgt
            </Checkbox>
            <div className={css.kandidatinformasjon}>
                <div className={css.navn}>
                    <Link
                        className="navds-link"
                        to={lenkeTilKandidat(kandidat.arenaKandidatnr, kandidatlisteId)}
                    >
                        {hentKandidatensNavn(kandidat)}
                    </Link>
                </div>
                <Detail className={css.innsatsgruppe}>
                    {alleInnsatsgrupper[kandidat.kvalifiseringsgruppekode].label}
                </Detail>
                {(alleØnskedeYrker || alleØnskedeSteder) && (
                    <div className={css.jobbønske}>
                        {alleØnskedeYrker && (
                            <TekstlinjeMedIkon
                                label="Ønsket yrke"
                                ikon={<HeartIcon />}
                                tekst={alleØnskedeYrker}
                            />
                        )}
                        {alleØnskedeSteder && (
                            <TekstlinjeMedIkon
                                label="Ønsket sted"
                                ikon={<PinIcon />}
                                tekst={alleØnskedeSteder}
                            />
                        )}
                    </div>
                )}
                {kandidatAlleredeLagtTilPåKandidatlista && (
                    <div
                        title="Kandidater er allerede lagt til på kandidatlisten"
                        className={css.kandidatPåListe}
                    >
                        <CheckmarkIcon />
                    </div>
                )}
            </div>
        </div>
    );
};

const kandidatenErPåKandidatlista = (
    kandidat: EsKandidat,
    kandidatliste: Kandidatliste
): boolean => {
    return kandidatliste.kandidater.some((kandidatPåLista) => {
        return kandidatPåLista.kandidatnr === kandidat.arenaKandidatnr;
    });
};

export const hentKandidatensNavn = (kandidat: EsKandidat) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const hentKandidatensØnskedeYrker = (kandidat: EsKandidat) =>
    kandidat.yrkeJobbonskerObj.length === 0
        ? undefined
        : kandidat.yrkeJobbonskerObj.map((jobbønske) => jobbønske.styrkBeskrivelse).join(', ');

const hentKandidatensØnskedeSteder = (kandidat: EsKandidat) =>
    kandidat.geografiJobbonsker.length === 0
        ? undefined
        : kandidat.geografiJobbonsker.map((jobbønske) => jobbønske.geografiKodeTekst).join(', ');

export default Kandidatrad;
