import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Checkbox } from '@navikt/ds-react';
import classNames from 'classnames';
import { ChangeEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { useHentStillingTittel } from '../../felles/hooks/useStilling';
import { storForbokstav } from '../utils';
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

    const stillingstittel = useHentStillingTittel(kandidatliste.stillingId);
    const visningstittel = kandidatliste.stillingId ? stillingstittel : tittel;
    return (
        <div key={kandidatlisteId} className={css.kandidatliste}>
            <Checkbox
                hideLabel
                id={checkboxId}
                disabled={lagredeLister.has(kandidatlisteId)}
                value={kandidatlisteId}
                onChange={onKandidatlisteMarkert}
            >
                {visningstittel}
            </Checkbox>
            <label className={labelCls} htmlFor={checkboxId}>
                {visningstittel}
            </label>
            <BodyShort className={classNames(css.arbeidsgiver, css.maksEnLinje)}>
                {storForbokstav(kandidatliste.organisasjonNavn)}
            </BodyShort>
            <BodyShort className={css.opprettet}>{opprettetDato}</BodyShort>
            <Link
                target="_blank"
                //TODO finn ndenne
                // to={lenkeTilKandidatliste(kandidatlisteId)}
                to={'#'}
                className="navds-link"
            >
                <ExternalLinkIcon title="Åpne kandidatliste" />
            </Link>
        </div>
    );
};

export default VelgbarKandidatliste;
