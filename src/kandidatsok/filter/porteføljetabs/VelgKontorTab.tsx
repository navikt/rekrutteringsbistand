import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Popover, Tabs } from '@navikt/ds-react';
import {
    FunctionComponent,
    KeyboardEventHandler,
    MouseEventHandler,
    useRef,
    useState,
} from 'react';
import { Portefølje } from '../../../api/kandidat-søk-api/kandidatsøk';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { IKandidatSøkekriterier } from '../../hooks/useSøkekriterier';
import VelgKontor from '../VelgKontor';
import css from './VelgKontorTab.module.css';

const POPOVER_ID = 'velg-kontor-popover';
const FORSLAG_ID = 'velg-kontor-tab';

type Props = {
    søkekriterier: IKandidatSøkekriterier;
};

const VelgKontorTab: FunctionComponent<Props> = ({ søkekriterier }) => {
    const [visKontorvelger, setVisKontorvelger] = useState<boolean>(false);
    const [beholdKontorvelger, setBeholdKontorvelger] = useState<boolean>(true);
    const velgKontorRef = useRef<HTMLButtonElement>(null);

    const onClickOutside = () => {
        if (visKontorvelger) {
            if (beholdKontorvelger) {
                setBeholdKontorvelger(false);
            } else {
                setVisKontorvelger(false);
                setBeholdKontorvelger(true);
            }
        }
    };

    useOnClickOutside(onClickOutside, [POPOVER_ID, FORSLAG_ID]);

    const onVelgKontorKnappClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (visKontorvelger) {
            setVisKontorvelger(false);
        } else {
            setBeholdKontorvelger(true);
            setVisKontorvelger(true);
        }
    };

    const onVelgKontorTabClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (søkekriterier.valgtKontor.size === 0) {
            setVisKontorvelger(true);
        }
    };

    const onVelgKontorTabKeyDown: KeyboardEventHandler = (event) => {
        if (event.code === 'Space' || event.key === 'Enter') {
            setVisKontorvelger(true);
        } else if (event.code === 'Escape') {
            setVisKontorvelger(false);
            setBeholdKontorvelger(true);
        }
    };

    const onLukkeknappClick = () => {
        setVisKontorvelger(false);
        setBeholdKontorvelger(true);
    };

    const antallKontorerValgt = søkekriterier.valgtKontor.size;

    return (
        <>
            <Tabs.Tab
                ref={velgKontorRef}
                value={Portefølje.VALGTE_KONTORER}
                onClick={onVelgKontorTabClick}
                onKeyDown={onVelgKontorTabKeyDown}
                label={'Valgte kontorer' + (antallKontorerValgt ? ` (${antallKontorerValgt})` : '')}
                className={css.tab}
                icon={
                    <Button
                        as="div"
                        tabIndex={-1}
                        className={css.knapp}
                        onClick={onVelgKontorKnappClick}
                        variant="tertiary"
                        role="button"
                    >
                        {visKontorvelger ? (
                            <ChevronUpIcon title="Lukk kontorvelger" />
                        ) : (
                            <ChevronDownIcon title="Velg andre kontor" />
                        )}
                    </Button>
                }
            />
            <Popover
                placement="bottom"
                id={POPOVER_ID}
                open={visKontorvelger}
                anchorEl={velgKontorRef.current}
                onClose={() => null}
            >
                <Popover.Content className={css.popover}>
                    <Button
                        className={css.lukkeknapp}
                        size="small"
                        variant="tertiary"
                        aria-label="Lukk kontorvelger"
                        onClick={onLukkeknappClick}
                        icon={<XMarkIcon />}
                    />
                    <VelgKontor forslagId={FORSLAG_ID} />
                </Popover.Content>
            </Popover>
        </>
    );
};

export default VelgKontorTab;
