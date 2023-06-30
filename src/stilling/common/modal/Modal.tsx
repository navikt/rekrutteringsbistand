import { Modal as DsModal, ModalProps } from '@navikt/ds-react';
import css from './Modal.module.css';
import classNames from 'classnames';

const Modal = ({ children, className, ...props }: ModalProps) => (
    <DsModal {...props}>
        <DsModal.Content className={classNames(css.modal, className)}>{children}</DsModal.Content>
    </DsModal>
);

export default Modal;
