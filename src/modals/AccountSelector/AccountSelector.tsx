import { Button, Modal, Text } from '@deriv-com/ui';

import { TradingAccountsList } from '@/components';
import { useQueryParams } from '@/hooks';

export const AccountSelector = () => {
    const { isModalOpen, openModal, closeModal } = useQueryParams();
    return (
        <Modal ariaHideApp={false} isOpen={isModalOpen('AccountSelector')}>
            <Modal.Header onRequestClose={closeModal}>
                <Text weight='bold'>Select an account</Text>
            </Modal.Header>
            <Modal.Body className='p-0 overflow-auto'>
                <TradingAccountsList />
            </Modal.Body>
            <Modal.Footer className='grid-cols-1'>
                <Button
                    color='black'
                    isFullWidth
                    onClick={() => {
                        openModal('AddOrManageAccount');
                    }}
                    variant='outlined'
                    size='sm'
                >
                    Add or manage account
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
