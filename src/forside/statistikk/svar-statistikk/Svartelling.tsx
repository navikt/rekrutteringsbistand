import { Chat2Icon, ChatCheckmarkIcon, ChatIcon } from '@navikt/aksel-icons';
import { Detail, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './Svartelling.module.css';
import Kryssikon from './kryss.svg';

export enum SvartellingIkon {
    Delt,
    Ja,
    Nei,
    SvarteIkke,
}

type Props = {
    svartellingIkon: SvartellingIkon;
    oppsummering: string;
    detaljer: string;
    forklaring: string;
};

const Svartelling: FunctionComponent<Props> = ({
    svartellingIkon,
    oppsummering,
    detaljer,
    forklaring,
}) => {
    const ikon = (valgtIkon: SvartellingIkon) => {
        switch (valgtIkon) {
            case SvartellingIkon.Delt:
                return <Chat2Icon fontSize="2" className={css.antallStillinger}></Chat2Icon>;
            case SvartellingIkon.Ja:
                return <ChatCheckmarkIcon className={css.svartJa}></ChatCheckmarkIcon>;
            case SvartellingIkon.Nei:
                return (
                    <>
                        <span className={css.kryss}>
                            <Kryssikon />
                        </span>
                        <ChatIcon className={css.svartNei}></ChatIcon>
                    </>
                );
            case SvartellingIkon.SvarteIkke:
                return <ChatIcon className={css.ubesvart}></ChatIcon>;
        }
    };

    return (
        <div className={css.svartelling}>
            {ikon(svartellingIkon)}
            <Label className={css.oppsummering}>{oppsummering}</Label>
            <Detail className={css.detaljer}>{detaljer}</Detail>
            <Detail className={css.detaljer}>{forklaring}</Detail>
        </div>
    );
};

export default Svartelling;
