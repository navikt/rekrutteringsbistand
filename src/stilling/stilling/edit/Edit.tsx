import { NewspaperIcon } from '@navikt/aksel-icons';
import { Accordion, Alert, Button, CopyButton } from '@navikt/ds-react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Stilling, {
    Stillingsinfo,
    Stillingskategori,
    System,
} from 'felles/domene/stilling/Stilling';
import { State } from '../../redux/store';
import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import EksternStillingAdvarsel from '../forhåndsvisning/header/EksternStillingAdvarsel';
import Stillingsheader from '../header/Stillingsheader';
import Arbeidssted from './arbeidssted/Arbeidssted';
import EndreArbeidsgiver from './endre-arbeidsgiver/EndreArbeidsgiver';
import EditHeader from './header/EditHeader';
import HvordanSendeSøknad from './hvordan-sende-søknad/HvordanSendeSøknad';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import OmStillingen from './om-stillingen/OmStillingen';
import PraktiskeOpplysninger from './praktiske-opplysninger/PraktiskeOpplysninger';
import RegistrerInkluderingsmuligheter from './registrer-inkluderingsmuligheter/DirektemeldtStilling';
import Seksjon from './seksjon/Seksjon';

import css from './Edit.module.css';

type Props = {
    onPreviewAdClick: () => void;
    erEier: boolean;
    resetValidation: () => void;
    stilling: Stilling;
    hasChanges: boolean;
    stillingsinfoData: Stillingsinfo;
    kandidatlisteId: string;
};

const Edit = ({
    stilling,
    onPreviewAdClick,
    resetValidation,
    erEier,
    stillingsinfoData,
    kandidatlisteId,
}: Props) => {
    const stillingenErEkstern = stilling.createdBy !== System.Rekrutteringsbistand;
    const stillingsLenke = hentAnnonselenke(stilling.uuid);

    useEffect(() => {
        return () => {
            resetValidation();
        };
    }, [resetValidation]);

    return (
        <>
            <Stillingsheader
                kandidatlisteId={kandidatlisteId}
                erEier={erEier}
                erFormidling={stillingsinfoData.stillingskategori === Stillingskategori.Formidling}
            >
                {stillingErPublisert(stilling) && (
                    <CopyButton
                        copyText={stillingsLenke}
                        text="Kopier annonselenke"
                        size="medium"
                    />
                )}
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
                    <Seksjon tittel="Tittel på annonsen">
                        <EditHeader stilling={stilling} />
                    </Seksjon>
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
                        <OmStillingen stilling={stilling} />
                    </Seksjon>
                </Accordion>
                <Accordion className={classNames(css.høyre, css.accordions)}>
                    <Seksjon spacing tittel="Praktiske opplysninger">
                        <PraktiskeOpplysninger />
                    </Seksjon>
                    <Seksjon spacing tittel="Kontaktinformasjon">
                        <Kontaktinformasjon />
                    </Seksjon>
                    <Seksjon
                        tittel="Hvordan sende søknad?"
                        beskrivelse="Gjelder kun eksternt utlyste stillinger"
                    >
                        <HvordanSendeSøknad />
                    </Seksjon>
                    <Seksjon påkrevd tittel="Arbeidssted">
                        <Arbeidssted />
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
    stillingsinfoData: state.stillingsinfoData,
    stilling: state.adData,
    hasChanges: state.ad.hasChanges,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
