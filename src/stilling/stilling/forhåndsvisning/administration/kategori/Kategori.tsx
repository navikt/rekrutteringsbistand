import { BodyShort, Heading } from '@navikt/ds-react';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';

const Kategori: FunctionComponent = () => {
    const { stillingskategori } = useSelector((state: State) => state.stillingsinfoData);

    return (
        <div>
            <Heading size="small" level="3" spacing>
                Kategori
            </Heading>
            <BodyShort>{kategoriTilVisningsnavn(stillingskategori)}</BodyShort>
        </div>
    );
};

export const kategoriTilVisningsnavn = (kategori: Stillingskategori | null) => {
    switch (kategori) {
        case Stillingskategori.Stilling:
            return 'Stilling';
        case Stillingskategori.Formidling:
            return 'Formidling';
        case Stillingskategori.Arbeidstrening:
            return 'Arbeidstrening';
        case Stillingskategori.Jobbmesse:
            return 'Jobbmesse/jobbtreff';
        default:
            return 'Stilling';
    }
};

export default Kategori;
