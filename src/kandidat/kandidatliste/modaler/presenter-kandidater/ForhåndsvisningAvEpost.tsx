import { api } from 'felles/api';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import css from './ForhåndsvisningAvEpost.module.css';

type Props = {
    kandidatliste: Kandidatliste;
    melding: string;
};

const ForhåndsvisningAvEpost = ({ kandidatliste, melding }: Props) => {
    const handleFerdigLastet = (iFrame: HTMLIFrameElement) => {
        const iframeDocument = iFrame.contentWindow.document;

        const tittelElement = iframeDocument.getElementById('tittel');
        const stillingstittelElement = iframeDocument.getElementById('stillingstittel');
        const tekstElement = iframeDocument.getElementById('tekst');
        const avsenderElement = iframeDocument.getElementById('avsender');

        if (tittelElement) tittelElement.innerText = kandidatliste.tittel;
        if (stillingstittelElement) stillingstittelElement.innerText = kandidatliste.tittel;
        if (tekstElement) tekstElement.innerHTML = melding;
        if (avsenderElement) avsenderElement.innerHTML = kandidatliste.opprettetAv.navn;
    };

    return (
        <iframe
            title="forhåndsvisning"
            className={css.iframe}
            onLoad={(event) => handleFerdigLastet(event.currentTarget)}
            src={`${api.arbeidsgiverNotifikasjon}/template`}
        />
    );
};

export default ForhåndsvisningAvEpost;
