import { MT5Success } from '@cfd/modals';
import { Modal } from '@deriv-com/ui';

import { useQueryParams } from '@/hooks';

export const MT5SuccessModal = () => {
    const { isModalOpen, closeModal } = useQueryParams();
    return (
        <Modal ariaHideApp={false} isOpen={isModalOpen('MT5SuccessModal')} onRequestClose={closeModal}>
            <Modal.Body>
                <MT5Success />
            </Modal.Body>
        </Modal>
    );
};
