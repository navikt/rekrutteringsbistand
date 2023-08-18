import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import Erfaring from './erfaring/Erfaring';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import sortByDato from '../tidsperiode/sortByDato';
import { BodyShort } from '@navikt/ds-react';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import { Godkjenning, Sertifikat } from 'felles/domene/kandidat/Cv';

type Props = {
    cv: KandidatCv;
};

const Godkjenninger = ({ cv }: Props) => {
    return cv.godkjenninger?.length > 0 || cv.sertifikater?.length > 0 ? (
        <Kort overskrift={'Godkjenninger'} ikon={<SealCheckmarkIcon />}>
            <div className={css.erfaringer}>
                {cv.godkjenninger?.length > 0 &&
                    cv.godkjenninger.map((godkjenning) => {
                        return (
                            <Erfaring
                                key={`${godkjenning.konseptId}-${godkjenning.gjennomfoert}`}
                                overskrift={godkjenning.tittel}
                                beskrivelse={null}
                                tidsperiode={visTidsperiodeGodkjenning(godkjenning)}
                            />
                        );
                    })}
                {cv.godkjenninger?.length > 0 && cv.sertifikater?.length > 0 ? (
                    <div className={css.deler} />
                ) : null}
                {cv.sertifikater?.length > 0 &&
                    sortByDato(cv.sertifikater).map((sertifikat) => {
                        return (
                            <Erfaring
                                key={`${sertifikat.sertifikatKode}-${sertifikat.alternativtNavn}-${sertifikat.fraDato}`}
                                overskrift={
                                    sertifikat.alternativtNavn
                                        ? sertifikat.alternativtNavn
                                        : sertifikat.sertifikatKodeNavn
                                }
                                beskrivelse={null}
                                tidsperiode={visTidsperiodeSertifikat(sertifikat)}
                            />
                        );
                    })}
            </div>
        </Kort>
    ) : null;
};

const visTidsperiodeGodkjenning = (godkjenning: Godkjenning) => {
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

const visTidsperiodeSertifikat = (sertifikat: Sertifikat) => {
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
