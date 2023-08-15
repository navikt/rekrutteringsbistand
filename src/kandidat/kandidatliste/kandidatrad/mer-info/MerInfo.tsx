import { BodyShort, Label, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import LenkeTilAktivitetsplan from '../../../komponenter/lenke-til-aktivitetsplan/LenkeTilAktivitetsplan';
import InfoUnderKandidat from '../info-under-kandidat/InfoUnderKandidat';
import css from './MerInfo.module.css';

type Props = {
    kandidat: KandidatIKandidatliste;
};

const MerInfo: FunctionComponent<Props> = ({ kandidat }) => {
    return (
        <InfoUnderKandidat className={css.merInfo}>
            <div className={css.kontaktinfo}>
                <Label spacing as="p">
                    Kontaktinfo:
                </Label>
                <BodyShort>
                    E-post:{' '}
                    {kandidat.epost ? (
                        <Link href={`mailto:${kandidat.epost}`}>{kandidat.epost}</Link>
                    ) : (
                        <span>&mdash;</span>
                    )}
                </BodyShort>
                <BodyShort>
                    Telefon: {kandidat.telefon ? kandidat.telefon : <span>&mdash;</span>}
                </BodyShort>
            </div>
            <div className={css.innsatsgruppe}>
                <Label spacing as="p">
                    Innsatsgruppe:
                </Label>
                <span>{kandidat.innsatsgruppe}</span>
                <LenkeTilAktivitetsplan fnr={kandidat.fodselsnr} />
            </div>
        </InfoUnderKandidat>
    );
};

export default MerInfo;
