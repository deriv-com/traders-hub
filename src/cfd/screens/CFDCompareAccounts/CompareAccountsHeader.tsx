import { useNavigate } from 'react-router-dom';

import { Text } from '@deriv-com/ui';

import { IconComponent } from '@/components';
import { useActiveDerivTradingAccount, useRegulationFlags } from '@/hooks';

const CompareAccountsHeader = () => {
    const { data: activeDerivTrading } = useActiveDerivTradingAccount();
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;
    const navigate = useNavigate();

    const isDemo = activeDerivTrading?.is_virtual;

    const accountType = isDemo ? 'Demo' : 'real';
    const demoSuffix = isDemo ? 'demo ' : '';
    const headerTitle = isEU ? `Deriv MT5 CFDs ${accountType} account` : `Compare CFDs ${demoSuffix}accounts`;

    return (
        <div className='sticky flex items-center border-solid z-[999] border-b-1 py-0 px-16 top-0 h-50 border-system-light-secondary-background'>
            <div className='flex justify-center w-full'>
                <Text size='xl' weight='bold'>
                    {headerTitle}
                </Text>
            </div>
            <IconComponent
                icon='Close'
                className='cursor-pointer'
                onClick={() => {
                    navigate('/traders-hub');
                }}
            />
        </div>
    );
};

export default CompareAccountsHeader;
