import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import Erfaring from './erfaring/Erfaring';
import Kort from '../kort/Kort';
import CvType, { Godkjenning, Sertifikat } from '../reducer/cv-typer';
import css from './Cv.module.css';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import sortByDato from '../tidsperiode/sortByDato';
import { BodyShort } from '@navikt/ds-react';

type Props = {
    cv: CvType;
};

const Godkjenninger = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Godkjenninger'}
            ikon={<SealCheckmarkIcon />}
            innhold={
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
                    <div className={css.deler} />
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
            }
        />
    );
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
