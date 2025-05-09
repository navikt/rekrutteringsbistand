import { Button, ErrorMessage } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendEvent } from 'felles/amplitude';
import { ApplikasjonContext } from '../../../../../../felles/ApplikasjonContext';
import { SearchApiError } from '../../../../../api/fetchUtils';
import { resendForespørselOmDelingAvCv } from '../../../../../api/forespørselOmDelingAvCvApi';
import {
    ForespørselOmDelingAvCv,
    ResendForespørselOutboundDto,
} from '../../../../knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import VelgSvarfrist, {
    Svarfrist,
    lagSvarfristPåSekundet,
} from '../../../../knappe-rad/forespørsel-om-deling-av-cv/VelgSvarfrist';
import KandidatlisteActionType from '../../../../reducer/KandidatlisteActionType';
import Hendelse, { Hendelsesstatus } from '../Hendelse';
import css from './SendForespørselPåNytt.module.css';

type Props = {
    gamleForespørsler: ForespørselOmDelingAvCv[];
    gjeldendeForespørsel: ForespørselOmDelingAvCv;
    onLukk: () => void;
};

const SendForespørselPåNytt: FunctionComponent<Props> = ({
    gamleForespørsler,
    gjeldendeForespørsel,
    onLukk,
}) => {
    const dispatch = useDispatch();
    const { valgtNavKontor } = useContext(ApplikasjonContext);
    const [svarfrist, setSvarfrist] = useState<Svarfrist>(Svarfrist.ToDager);
    const [egenvalgtFrist, setEgenvalgtFrist] = useState<Date | undefined>();
    const [egenvalgtFristFeilmelding, setEgenvalgtFristFeilmelding] = useState<
        string | undefined
    >();
    const [senderForespørselPåNytt, setSenderForespørselPåNytt] = useState(false);
    const [feilmelding, setFeilmelding] = useState<string | null>(null);

    const onDelPåNyttClick = async () => {
        if (egenvalgtFristFeilmelding) {
            return;
        }

        if (valgtNavKontor?.navKontor) {
            const { stillingsId, aktørId } = gjeldendeForespørsel;
            const outboundDto: ResendForespørselOutboundDto = {
                stillingsId,
                svarfrist: lagSvarfristPåSekundet(svarfrist, egenvalgtFrist),
                navKontor: valgtNavKontor?.navKontor,
            };

            setSenderForespørselPåNytt(true);

            try {
                const response = await resendForespørselOmDelingAvCv(aktørId, outboundDto);

                if (førsteGangKandidatenFårTilsendtForespørselPåNytt(gamleForespørsler)) {
                    sendEvent('forespørsel_deling_av_cv', 'resending', {
                        stillingsId: gjeldendeForespørsel.stillingsId,
                        antallKandidater: 1,
                        utfallOpprinneligForespørsel: gjeldendeForespørsel.tilstand,
                    });
                }

                dispatch({
                    type: KandidatlisteActionType.ResendForespørselOmDelingAvCvSuccess,
                    forespørslerOmDelingAvCv: response,
                });
                onLukk();
            } catch (e) {
                if (e instanceof SearchApiError) {
                    setFeilmelding(e.message);
                } else {
                    setFeilmelding(
                        'Klarte ikke å dele med kandidaten på nytt. Vennligst prøv igjen senere.'
                    );
                }
            } finally {
                setSenderForespørselPåNytt(false);
            }
        } else {
            setFeilmelding('Du må representere et Nav-kontor for å dele stillingen på nytt.');
        }
    };

    const onSvarfristChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSvarfrist(event.target.value as Svarfrist);
    };

    const onEgenvalgtFristChange = (dato?: Date) => {
        setEgenvalgtFrist(dato);
    };

    const onEgenvalgtFristFeilmeldingChange = (feilmelding?: string) => {
        setEgenvalgtFristFeilmelding(feilmelding);
    };

    return (
        <Hendelse
            renderChildrenBelowContent
            status={Hendelsesstatus.Hvit}
            tittel="Del stillingen med kandidaten på nytt"
            beskrivelse="Kandidaten kan tidligere ha mottatt stillingen. Du bør kontakte kandidaten før du deler på nytt."
        >
            <VelgSvarfrist
                tittel="Ny frist for svar"
                svarfrist={svarfrist}
                egenvalgtFrist={egenvalgtFrist}
                onSvarfristChange={onSvarfristChange}
                onEgenvalgtFristChange={onEgenvalgtFristChange}
                onEgenvalgtFristFeilmeldingChange={onEgenvalgtFristFeilmeldingChange}
                egenvalgtFristFeilmelding={egenvalgtFristFeilmelding}
            />
            <div className={css.delPåNyttKnapper}>
                <Button
                    size="small"
                    variant="primary"
                    onClick={onDelPåNyttClick}
                    loading={senderForespørselPåNytt}
                >
                    Del på nytt
                </Button>
                <Button onClick={onLukk} variant="secondary" size="small">
                    Avbryt
                </Button>
            </div>
            {feilmelding && (
                <ErrorMessage className={css.delPåNyttFeilmelding}>
                    Feilmelding: {feilmelding}
                </ErrorMessage>
            )}
        </Hendelse>
    );
};

const førsteGangKandidatenFårTilsendtForespørselPåNytt = (
    gamleForespørsler: ForespørselOmDelingAvCv[]
) => gamleForespørsler.length === 0;

export default SendForespørselPåNytt;
