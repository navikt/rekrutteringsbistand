import { ErrorMessage } from '@navikt/ds-react';
import { Brødsmule } from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { useKandidatsammendrag } from '../../../../api/kandidat-søk-api/kandidatsammendrag';
import Sidelaster from '../../../../felles/komponenter/sidelaster/Sidelaster';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';

type Props = {
    kandidatnr: string;
    kandidatnavigering: Kandidatnavigering | null;
    brødsmulesti: Brødsmule[];
};

const Kandidatheader = ({ kandidatnavigering, kandidatnr, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();

    const { data: kandidatsammendrag, isLoading, error } = useKandidatsammendrag({ kandidatnr });

    if (isLoading) {
        return <Sidelaster />;
    }

    if (error) {
        return <ErrorMessage> Klarte ikke å laste inn informasjon om kandidat </ErrorMessage>;
    }

    const brødsmulestiMedNavn = kandidatsammendrag
        ? [
              ...(brødsmulesti ?? []),
              {
                  tekst: formaterNavn(kandidatsammendrag),
              },
          ]
        : brødsmulesti;
    return (
        <>
            {kandidatsammendrag && kandidatsammendrag?.arenaKandidatnr && (
                <Kandidatbanner
                    kandidatnr={kandidatsammendrag.arenaKandidatnr}
                    brødsmulesti={brødsmulestiMedNavn}
                    øverstTilHøyre={
                        kandidatnavigering && (
                            <div className={css.forrigeNeste}>
                                <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                            </div>
                        )
                    }
                ></Kandidatbanner>
            )}
        </>
    );
};

export default Kandidatheader;
