import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyShort, Button } from '@navikt/ds-react';

import Modal from '../../common/modal/Modal';
import { FJERN_NETTVERKSERROR_FRA_STATE } from '../adReducer';
import css from './Error.module.css';

class Error extends React.Component {
    render() {
        const error = this.props.error;
        const showError = error && error.statusCode !== 401;
        const showDefaultError = error && error.statusCode !== 404 && error.statusCode !== 412;

        return error && showError ? (
            <Modal
                open
                closeButton={false}
                onClose={() => this.props.closeModal()}
                aria-label="Feilmelding"
            >
                <div className={css.error}>
                    {error.statusCode === 404 && <BodyShort>Fant ikke annonsen</BodyShort>}
                    {error.statusCode === 412 && (
                        <div>
                            <BodyShort spacing>Annonsen har blitt redigert av noen andre</BodyShort>
                            <LastInnPåNytt />
                        </div>
                    )}
                    {showDefaultError && (
                        <BodyShort>
                            Det oppsto en feil, forsøk å laste siden på nytt
                            <br />
                            {error.statusCode}: {error.message}
                        </BodyShort>
                    )}
                </div>
            </Modal>
        ) : null;
    }
}

const LastInnPåNytt = () => (
    <Button className={css.button} onClick={() => window.location.reload()}>
        Last siden på nytt
    </Button>
);

Error.defaultProps = {
    error: undefined,
    closeModal: () => {},
};

Error.propTypes = {
    error: PropTypes.shape({
        statusCode: PropTypes.number,
        message: PropTypes.string,
    }),
    closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    error: state.ad.error,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch({ type: FJERN_NETTVERKSERROR_FRA_STATE });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
