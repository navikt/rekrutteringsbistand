import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Checkbox, Label } from '@navikt/ds-react';
import classNames from 'classnames';
import { ChangeEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { lenkeTilKandidatliste } from '../../../app/paths';
import KandidatlisteTittel from '../../../kandidatliste/KandidatlisteTittel';
import { capitalizeEmployerName } from '../../../utils/formateringUtils';
import css from './VelgKandidatlister.module.css';

type Props = {
    kandidatliste: Omit<Kandidatliste, 'kandidater'>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const VelgbarKandidatliste: FunctionComponent<Props> = ({
    kandidatliste,
    lagredeLister,
    onKandidatlisteMarkert,
}) => {
    const { kandidatlisteId, tittel } = kandidatliste;
    const checkboxId = `velg-kandidatliste-${kandidatliste.kandidatlisteId}`;
    const erLagtTil = lagredeLister.has(kandidatlisteId);
    const opprettetDato = new Date(kandidatliste.opprettetTidspunkt).toLocaleDateString('nb', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const labelCls = classNames(css.label, css.maksEnLinje, {
        [css.disabled]: erLagtTil,
    });

    return (
        <div key={kandidatlisteId} className={css.kandidatliste}>
            <Checkbox
                hideLabel
                id={checkboxId}
                disabled={lagredeLister.has(kandidatlisteId)}
                value={kandidatlisteId}
                onChange={onKandidatlisteMarkert}
            >
                <KandidatlisteTittel
                    stillingid={kandidatliste?.stillingId}
                    kandidatlisteTittel={tittel}
                />
            </Checkbox>
            <Label className={labelCls} htmlFor={checkboxId}>
                <KandidatlisteTittel
                    stillingid={kandidatliste?.stillingId}
                    kandidatlisteTittel={tittel}
                />
            </Label>
            {kandidatliste.organisasjonNavn ? (
                <BodyShort className={classNames(css.arbeidsgiver, css.maksEnLinje)}>
                    {capitalizeEmployerName(kandidatliste.organisasjonNavn)}
                </BodyShort>
            ) : (
                <span />
            )}
            <BodyShort className={css.opprettet}>{opprettetDato}</BodyShort>
            {kandidatliste.stillingId && (
                <Link
                    target="_blank"
                    to={lenkeTilKandidatliste(kandidatliste?.stillingId)}
                    className="navds-link"
                >
                    <ExternalLinkIcon title="Åpne kandidatliste" />
                </Link>
            )}
        </div>
    );
};

export default VelgbarKandidatliste;
