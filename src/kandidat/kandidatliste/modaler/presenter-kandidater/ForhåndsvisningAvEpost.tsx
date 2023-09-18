import { api } from 'felles/api';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { useCallback, useEffect, useRef } from 'react';
import css from './ForhåndsvisningAvEpost.module.css';

type Props = {
    kandidatliste: Kandidatliste;
    melding: string;
};

const ForhåndsvisningAvEpost = ({ kandidatliste, melding }: Props) => {
    const iframeRef = useRef<HTMLIFrameElement>();

    const erstattPlaceholders = useCallback(
        (iframe: HTMLIFrameElement | null) => {
            if (iframe) {
                const iframeDocument = iframe.contentWindow.document;

                const tittelElement = iframeDocument.getElementById('tittel');
                const stillingstittelElement = iframeDocument.getElementById('stillingstittel');
                const tekstElement = iframeDocument.getElementById('tekst');
                const avsenderElement = iframeDocument.getElementById('avsender');

                if (tittelElement) tittelElement.innerText = kandidatliste.tittel;
                if (stillingstittelElement) stillingstittelElement.innerText = kandidatliste.tittel;
                if (tekstElement) tekstElement.innerHTML = melding;
                if (avsenderElement) avsenderElement.innerHTML = kandidatliste.opprettetAv.navn;
            }
        },
        [kandidatliste.opprettetAv.navn, kandidatliste.tittel, melding]
    );

    useEffect(() => {
        erstattPlaceholders(iframeRef.current);
    }, [erstattPlaceholders]);

    const handleFerdigLastet = (iframe: HTMLIFrameElement) => {
        iframeRef.current = iframe;

        erstattPlaceholders(iframe);
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
