import { BodyShort } from '@navikt/ds-react';
import ellipse from '../../ikoner/ellipse.svg';
import css from './Språkferdighet.module.css';
import {
    Språkferdighet as SpråkferdighetType,
    Språkferdighetsnivå,
} from 'felles/domene/kandidat/Cv';

type Props = {
    ferdighet: SpråkferdighetType;
};

const Språkferdighet = ({ ferdighet }: Props) => (
    <div className={css.språkferdighet}>
        <BodyShort size="small" className={css.tekst}>
            Skriftlig: {språkferdighetTilVisningsnavn(ferdighet.ferdighetSkriftlig)}
        </BodyShort>
        <div className={css.ikon}>
            <img src={ellipse} alt="" />
        </div>
        <BodyShort size="small" className={css.tekst}>
            Muntlig: {språkferdighetTilVisningsnavn(ferdighet.ferdighetMuntlig)}
        </BodyShort>
    </div>
);

const språkferdighetTilVisningsnavn = (ferdighet: Språkferdighetsnivå) => {
    switch (ferdighet) {
        case Språkferdighetsnivå.IkkeOppgitt:
            return '-';
        case Språkferdighetsnivå.Nybegynner:
            return 'Nybegynner';
        case Språkferdighetsnivå.Godt:
            return 'Godt';
        case Språkferdighetsnivå.VeldigGodt:
            return 'Veldig godt';
        case Språkferdighetsnivå.Førstespråk:
            return 'Morsmål';
        default:
            return '-';
    }
};

export default Språkferdighet;
