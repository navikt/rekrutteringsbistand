import { NewspaperIcon } from '@navikt/aksel-icons';
import { Accordion, Alert, Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Stilling, { System } from 'felles/domene/stilling/Stilling';
import { State } from '../../redux/store';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import EksternStillingAdvarsel from '../forhåndsvisning/header/EksternStillingAdvarsel';
import Stillingsheader from '../header/Stillingsheader';
import Arbeidssted from './arbeidssted/Arbeidssted';
import EndreArbeidsgiver from './endre-arbeidsgiver/EndreArbeidsgiver';
import HvordanSendeSøknad from './hvordan-sende-søknad/HvordanSendeSøknad';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import OmStillingen from './om-stillingen/OmStillingen';
import PraktiskeOpplysninger from './praktiske-opplysninger/PraktiskeOpplysninger';
import RegistrerInkluderingsmuligheter from './registrer-inkluderingsmuligheter/DirektemeldtStilling';
import Seksjon from './seksjon/Seksjon';

import css from './Edit.module.css';

type Props = {
    innloggetBruker: string;
    onPreviewAdClick: () => void;
    resetValidation: () => void;
    stilling: Stilling;
    erFormidling: boolean;
};

const Edit = ({
    innloggetBruker,
    stilling,
    onPreviewAdClick,
    resetValidation,
    erFormidling,
}: Props) => {
    const stillingenErEkstern = stilling.createdBy !== System.Rekrutteringsbistand;

    useEffect(() => {
        return () => {
            resetValidation();
        };
    }, [resetValidation]);

    return (
        <>
            <Stillingsheader>
                {!stillingenErEkstern && (
                    <Button onClick={onPreviewAdClick} size="small" icon={<NewspaperIcon />}>
                        Forhåndsvis stillingen
                    </Button>
                )}
            </Stillingsheader>
            {stillingenErEkstern ? (
                <EksternStillingAdvarsel />
            ) : (
                <Alert className={css.alert} variant="info">
                    Stillingsannonsen kan bli delt med kandidater. Det er viktig at annonseteksten
                    er informativ og lett å forstå.
                </Alert>
            )}
            <div className={css.edit}>
                <Accordion className={classNames(css.venstre, css.accordions)}>
                    <Seksjon spacing tittel="Om bedriften">
                        <EndreArbeidsgiver stilling={stilling} />
                    </Seksjon>
                    <Seksjon
                        påkrevd
                        tittel="Muligheter for å inkludere"
                        beskrivelse="Arbeidsgiver er åpen for å inkludere personer som har behov for tilrettelegging og/eller har nedsatt funksjonsevne."
                    >
                        <RegistrerInkluderingsmuligheter />
                    </Seksjon>
                    <Seksjon spacing tittel="Om stillingen">
                        <OmStillingen stilling={stilling} erFormidling={erFormidling} />
                    </Seksjon>
                </Accordion>
                <Accordion className={classNames(css.høyre, css.accordions)}>
                    <Seksjon spacing tittel="Praktiske opplysninger">
                        <PraktiskeOpplysninger />
                    </Seksjon>
                    <Seksjon spacing tittel="Kontaktinformasjon">
                        <Kontaktinformasjon innloggetBruker={innloggetBruker} />
                    </Seksjon>
                    <Seksjon
                        tittel="Hvordan sende søknad?"
                        beskrivelse="Gjelder kun eksternt utlyste stillinger"
                    >
                        {/* @ts-ignore TODO: written before strict-mode enabled */}
                        <HvordanSendeSøknad />
                    </Seksjon>
                    <Seksjon påkrevd tittel="Arbeidssted">
                        <Arbeidssted virksomhetLokasjon={stilling?.employer?.location} />
                    </Seksjon>
                </Accordion>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    resetValidation: () => dispatch({ type: RESET_VALIDATION_ERROR }),
});

const mapStateToProps = (state: State) => ({
    stilling: state.adData,
});

// @ts-ignore TODO: written before strict-mode enabled
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
