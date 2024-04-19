import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlatformDetails } from '@cfd/constants';
import { CFDSuccess } from '@cfd/screens';
import { Button, Modal } from '@deriv-com/ui';

import { useQueryParams } from '@/hooks';
import { useUIContext } from '@/providers';

export const CTraderSuccessModal = () => {
    const navigate = useNavigate();
    const { uiState } = useUIContext();
    const { isModalOpen, closeModal } = useQueryParams();

    const isDemo = uiState.accountType === 'demo';

    const renderButtons = useCallback(
        () =>
            isDemo ? (
                <Button className='rounded-xs' onClick={closeModal}>
                    Continue
                </Button>
            ) : (
                <div className='space-x-10'>
                    <Button
                        className='border-2 rounded-xs border-system-light-less-prominent'
                        color='black'
                        onClick={closeModal}
                        variant='outlined'
                    >
                        Maybe later
                    </Button>
                    <Button
                        className='rounded-xs'
                        onClick={() => {
                            closeModal();
                            navigate('/cashier/transfer');
                        }}
                    >
                        Transfer funds
                    </Button>
                </div>
            ),
        [closeModal, isDemo, navigate]
    );

    const description = isDemo
        ? `Congratulations, you have successfully created your demo ${PlatformDetails.ctrader.title} CFDs account.`
        : `Congratulations, you have successfully created your real ${PlatformDetails.ctrader.title} CFDs account. To start trading, transfer funds from your Deriv account into this account.`;

    return (
        <Modal
            isOpen={isModalOpen('CTraderSuccessModal')}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className='max-w-[440px] rounded-sm h-auto'
        >
            <Modal.Body>
                <CFDSuccess
                    description={description}
                    platform={PlatformDetails.ctrader.platform}
                    renderButtons={renderButtons}
                />
            </Modal.Body>
        </Modal>
    );
};
