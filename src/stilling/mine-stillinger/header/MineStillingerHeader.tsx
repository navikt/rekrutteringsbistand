import css from './MineStillingerHeader.module.css';
import { Button, Heading } from '@navikt/ds-react';

type Props = {
    opprettStilling: () => void;
};

const MineStillingerHeader = ({ opprettStilling }: Props) => (
    <div className={css.header}>
        <div className={css.wrapper}>
            <Heading level="1" size="xlarge" className={css.overskrift}>
                Mine stillinger
            </Heading>
            <Button onClick={opprettStilling} className={css.opprettNyKnapp}>
                Opprett ny
            </Button>
        </div>
    </div>
);

export default MineStillingerHeader;
