import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { Godkjenning, Sertifikat } from 'felles/domene/kandidat/Cv';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Kort from './kort/Kort';
import sortByDato from './sortByDato';

type Props = {
    cv: Kandidat;
};

const Godkjenninger = ({ cv }: Props) => {
    return cv.godkjenninger?.length > 0 || cv.sertifikatObj?.length > 0 ? (
        <Kort overskrift={'Godkjenninger'} ikon={<SealCheckmarkIcon />}>
            <div className={css.erfaringer}>
                {cv.godkjenninger?.length > 0 &&
                    cv.godkjenninger.map((godkjenning) => {
                        return (
                            <Erfaring
                                key={`${godkjenning.konseptId}-${godkjenning.gjennomfoert}`}
                                overskrift={godkjenning.tittel}
                                detaljer={<TidsperiodeGodkjenning godkjenning={godkjenning} />}
                            />
                        );
                    })}
                {cv.godkjenninger?.length > 0 && cv.sertifikatObj?.length > 0 ? (
                    <div className={css.deler} />
                ) : null}
                {cv.sertifikatObj?.length > 0 &&
                    sortByDato(cv.sertifikatObj).map((sertifikat) => {
                        return (
                            <Erfaring
                                key={`${sertifikat.sertifikatKode}-${sertifikat.alternativtNavn}-${sertifikat.fraDato}`}
                                overskrift={
                                    sertifikat.alternativtNavn
                                        ? sertifikat.alternativtNavn
                                        : sertifikat.sertifikatKodeNavn
                                }
                                detaljer={<TidsperiodeSertifikat sertifikat={sertifikat} />}
                            />
                        );
                    })}
            </div>
        </Kort>
    ) : null;
};

const TidsperiodeGodkjenning = ({ godkjenning }: { godkjenning: Godkjenning }) => {
    if (godkjenning.gjennomfoert && godkjenning.utloeper) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {formaterDatoHvisIkkeNull(godkjenning.gjennomfoert)}
                {' – ' + formaterDatoHvisIkkeNull(godkjenning.utloeper)}
            </BodyShort>
        );
    } else if (!godkjenning.gjennomfoert && godkjenning.utloeper) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {'Utløper ' + formaterDatoHvisIkkeNull(godkjenning.utloeper)}
            </BodyShort>
        );
    } else {
        return (
            <BodyShort size="small" className={css.tekst}>
                {formaterDatoHvisIkkeNull(godkjenning.gjennomfoert)}
            </BodyShort>
        );
    }
};

const TidsperiodeSertifikat = ({ sertifikat }: { sertifikat: Sertifikat }) => {
    if (sertifikat.fraDato && sertifikat.tilDato) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {formaterDatoHvisIkkeNull(sertifikat.fraDato)}
                {' – ' + formaterDatoHvisIkkeNull(sertifikat.tilDato)}
            </BodyShort>
        );
    } else if (!sertifikat.fraDato && sertifikat.tilDato) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {'Utløper ' + formaterDatoHvisIkkeNull(sertifikat.tilDato)}
            </BodyShort>
        );
    } else {
        return (
            <BodyShort size="small" className={css.tekst}>
                {formaterDatoHvisIkkeNull(sertifikat.fraDato)}
            </BodyShort>
        );
    }
};

export default Godkjenninger;
