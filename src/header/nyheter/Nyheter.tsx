import { MegaphoneSpeakingIcon } from '@navikt/aksel-icons';
import { Button, Heading, Popover } from '@navikt/ds-react';
import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import Artikkel from './Artikkel';
import css from './Nyheter.module.css';
import nyhetssaker from './nyhetssaker';
import useAntallUlesteNyheter from './useAntallUlesteNyheter';

export type Nyhet = {
    dato: Date;
    tittel: string;
    innhold: ReactNode;
};

const Nyheter: FunctionComponent = () => {
    const [åpen, setÅpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onFørsteBesøk = () => {
        setÅpen(true);
    };

    const [antallUlesteNyheter, antallUlesteVedSidelast, markerSomLest] = useAntallUlesteNyheter(
        nyhetssaker,
        onFørsteBesøk
    );

    useEffect(() => {
        if (åpen) {
            markerSomLest();
        }
    }, [åpen, markerSomLest]);

    return (
        <div className={css.nyheter}>
            <Button
                ref={buttonRef}
                className={css.knapp}
                onClick={() => setÅpen(!åpen)}
                variant="tertiary"
                icon={<MegaphoneSpeakingIcon aria-hidden />}
            >
                Hva er nytt
                {antallUlesteNyheter > 0 && <div className={css.notifikasjon} />}
            </Button>

            <Popover
                open={åpen}
                anchorEl={buttonRef.current}
                onClose={() => setÅpen(false)}
                placement="bottom-end"
            >
                <div className={css.popover}>
                    <Heading size="xsmall" level="2" className={css.tittel}>
                        Nytt i Rekrutteringsbistand
                    </Heading>
                    <section className={css.nyhetsliste}>
                        {nyhetssaker.map((nyhet, index) => (
                            <Artikkel
                                key={`${nyhet.dato}-${nyhet.tittel}`}
                                ulest={index < antallUlesteVedSidelast}
                                nyhet={nyhet}
                            />
                        ))}
                    </section>
                </div>
            </Popover>
        </div>
    );
};

export default Nyheter;
