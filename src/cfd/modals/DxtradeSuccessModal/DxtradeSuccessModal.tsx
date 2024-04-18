import { DxtradeSuccess } from '@cfd/modals/';
import { Modal } from '@deriv-com/ui';

import { useQueryParams } from '@/hooks';

export const DxtradeSuccessModal = () => {
    const { isModalOpen, closeModal } = useQueryParams();
    return (
        <Modal ariaHideApp={false} isOpen={isModalOpen('DxtradeSuccessModal')} onRequestClose={closeModal}>
            <Modal.Body>
                <DxtradeSuccess />
            </Modal.Body>
        </Modal>
    );
};
