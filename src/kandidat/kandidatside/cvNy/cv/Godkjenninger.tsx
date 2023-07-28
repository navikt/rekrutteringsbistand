import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import Erfaring from './erfaring/Erfaring';
import Kort from '../kort/Kort';
import CvType from '../reducer/cv-typer';
import Tidsperiode from '../tidsperiode/Tidsperiode';
import css from './Cv.module.css';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';

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
                            let beskrivelse = '';

                            if (godkjenning.utloeper) {
                                beskrivelse =
                                    formaterDatoHvisIkkeNull(godkjenning.gjennomfoert) +
                                    ' Utløper: ' +
                                    formaterDatoHvisIkkeNull(godkjenning.utloeper);
                            } else {
                                beskrivelse = formaterDatoHvisIkkeNull(godkjenning.gjennomfoert);
                            }
                            return (
                                <Erfaring
                                    key={`${godkjenning.konseptId}-${godkjenning.gjennomfoert}`}
                                    overskrift={godkjenning.tittel}
                                    beskrivelse={beskrivelse}
                                    tidsperiode={null}
                                />
                            );
                        })}
                    <div className={css.deler} />
                    {cv.sertifikater?.length > 0 &&
                        cv.sertifikater.map((sertifikat) => {
                            let beskrivelse = '';

                            if (sertifikat.tilDato) {
                                beskrivelse =
                                    formaterDatoHvisIkkeNull(sertifikat.fraDato) +
                                    ', Utløper: ' +
                                    formaterDatoHvisIkkeNull(sertifikat.tilDato);
                            } else {
                                beskrivelse = formaterDatoHvisIkkeNull(sertifikat.fraDato);
                            }
                            return (
                                <Erfaring
                                    key={`${sertifikat.sertifikatKode}-${sertifikat.alternativtNavn}-${sertifikat.fraDato}`}
                                    overskrift={
                                        sertifikat.alternativtNavn
                                            ? sertifikat.alternativtNavn
                                            : sertifikat.sertifikatKodeNavn
                                    }
                                    beskrivelse={beskrivelse}
                                    tidsperiode={null}
                                />
                            );
                        })}
                </div>
            }
        />
    );
};

export default Godkjenninger;
