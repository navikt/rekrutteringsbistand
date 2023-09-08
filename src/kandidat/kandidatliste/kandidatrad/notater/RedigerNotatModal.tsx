import { Button, Modal, Textarea } from '@navikt/ds-react';
import React, { ChangeEvent } from 'react';
import { Notat } from '../../domene/Kandidatressurser';

type Props = {
    notat: Notat;
    onClose: () => void;
    onSave: (notatId: string, notatTekst: string) => void;
};

class RedigerNotatModal extends React.Component<Props> {
    declare state: {
        notatTekst: string;
        feilmelding?: string;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            notatTekst: props.notat.tekst,
            feilmelding: undefined,
        };
    }

    onTekstChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            notatTekst: e.target.value,
        });
    };

    onLagreKlikk = () => {
        if (this.state.notatTekst.trim().length === 0) {
            this.setState({
                feilmelding: 'Notattekst må være utfylt',
            });
        } else {
            this.props.onSave(this.props.notat.notatId, this.state.notatTekst);
        }
    };

    render() {
        const { onClose } = this.props;
        const { notatTekst, feilmelding } = this.state;

        return (
            <Modal
                open
                aria-label="Rediger notat"
                onClose={onClose}
                header={{ heading: 'Rediger notat' }}
            >
                <Modal.Body>
                    <Textarea
                        autoFocus
                        label="Notat"
                        value={notatTekst}
                        onChange={this.onTekstChange}
                        error={feilmelding}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onLagreKlikk}>Lagre</Button>
                    <Button variant="secondary" className="modalknapp" onClick={onClose}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RedigerNotatModal;
