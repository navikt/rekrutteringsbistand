import { BodyShort, Popover } from '@navikt/ds-react';
import { FunctionComponent, MouseEvent, ReactNode, useState } from 'react';
import css from './MedPopover.module.css';

type Props = {
    id?: string;
    tittel?: string;
    hjelpetekst: ReactNode;
    className?: string;
    children?: ReactNode;
    placement?:
        | 'top'
        | 'bottom'
        | 'right'
        | 'left'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'right-start'
        | 'right-end'
        | 'left-start'
        | 'left-end';
    visOnHover?: boolean;
};

const MedPopover: FunctionComponent<Props> = ({
    id,
    tittel,
    hjelpetekst,
    className,
    placement,
    children,
    visOnHover = false,
}) => {
    const [anker, setAnker] = useState<Element | null>(null);

    const toggleAnker = (event: MouseEvent<HTMLElement>) => {
        setAnker(anker ? null : event.currentTarget);
    };

    const lukkAnker = () => {
        setAnker(null);
    };

    const vedHover = (event: MouseEvent<HTMLElement>) => {
        if (visOnHover) {
            setAnker(event.currentTarget);
        }
    };

    const vedHoverLeave = () => {
        if (visOnHover) {
            setAnker(null);
        }
    };

    return (
        <div
            onMouseEnter={vedHover}
            onMouseLeave={vedHoverLeave}
            id={id}
            role="button"
            title={tittel}
            onClick={toggleAnker}
            className={`med-popover${className ? ' ' + className : ''}`}
        >
            {children}
            <Popover
                open
                anchorEl={anker}
                onClose={lukkAnker}
                placement={placement ? placement : 'bottom'}
                className={css.ingenValgtPopover}
            >
                <Popover.Content>
                    <BodyShort size="small" as="div">
                        {hjelpetekst}
                    </BodyShort>
                </Popover.Content>
            </Popover>
        </div>
    );
};

export default MedPopover;
