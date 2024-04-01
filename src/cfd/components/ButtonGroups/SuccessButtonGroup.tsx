import { useNavigate } from 'react-router-dom';

import { Button } from '@deriv-com/ui';

import { ButtonGroup } from '@/components';
import { useActiveDerivTradingAccount, useQueryParams } from '@/hooks';

export const SuccessButtonGroup = () => {
    const { closeModal } = useQueryParams();
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const isDemo = activeTrading?.is_virtual;
    const navigate = useNavigate();

    if (isDemo) {
        return <Button onClick={closeModal}>OK</Button>;
    }
    return (
        <ButtonGroup className='justify-center w-full'>
            <Button color='black' onClick={closeModal} variant='outlined'>
                Maybe later
            </Button>
            <Button
                onClick={() => {
                    closeModal();
                    navigate('/cashier/transfer');
                }}
            >
                Transfer funds
            </Button>
        </ButtonGroup>
    );
};
