import { LanguageIcon } from '@navikt/aksel-icons';
import Kort from './kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import { BodyShort } from '@navikt/ds-react';
import { Språkferdighetsnivå } from 'felles/domene/kandidat/Cv';
import Detaljer from './detaljer/Detaljer';
import Kandidat from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: Kandidat;
};

const Språk = ({ cv }: Props) => {
    return cv.sprak?.length > 0 ? (
        <Kort overskrift={'Språk'} ikon={<LanguageIcon />}>
            <div className={css.erfaringer}>
                {cv.sprak.map((ferdighet) => {
                    return (
                        <Erfaring
                            key={`${ferdighet.sprakKodeTekst}${ferdighet.ferdighetMuntlig}${ferdighet.ferdighetSkriftlig}`}
                            overskrift={ferdighet.sprakKodeTekst} // TODO: Sjekk at det er riktig med beskrivelse, og ikke alternativtnavn
                            beskrivelse={
                                <Detaljer>
                                    <BodyShort size="small" className={css.tekst}>
                                        Skriftlig:{' '}
                                        {språkferdighetTilVisningsnavn(
                                            ferdighet.ferdighetSkriftlig
                                        )}
                                    </BodyShort>
                                    <BodyShort size="small" className={css.tekst}>
                                        Muntlig:{' '}
                                        {språkferdighetTilVisningsnavn(ferdighet.ferdighetMuntlig)}
                                    </BodyShort>
                                </Detaljer>
                            }
                        />
                    );
                })}
            </div>
        </Kort>
    ) : null;
};

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

export default Språk;
