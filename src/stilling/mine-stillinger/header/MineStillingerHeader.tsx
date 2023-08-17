import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Banner from 'felles/komponenter/banner/Banner';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';

type Props = {
    opprettStilling: () => void;
};

const MineStillingerHeader = ({ opprettStilling }: Props) => (
    <Banner tittel="Mine stillinger" ikon={<Piktogram />}>
        <Button variant="secondary" onClick={opprettStilling} icon={<PlusCircleIcon aria-hidden />}>
            Opprett ny
        </Button>
    </Banner>
);

export default MineStillingerHeader;
