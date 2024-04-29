import { useNavigate } from 'react-router-dom';

import { LabelPairedArrowLeftMdFillIcon, LabelPairedXmarkLgRegularIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/ui';

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
        <div className='sticky flex items-center border-solid z-40 border-b-1 py-0 px-16 top-0 h-50 border-system-light-secondary-background'>
            <div className='flex justify-start lg:justify-center w-full items-center'>
                <div className='absolute left-30 lg:block d-none'>
                    <div className='flex items-center gap-8 cursor-pointer' onClick={() => navigate('/')}>
                        <LabelPairedArrowLeftMdFillIcon />
                        <Text weight='bold'>Trader&apos;s Hub</Text>
                    </div>
                </div>
                <Text className='text-lg lg:text-xl' weight='bold'>
                    {headerTitle}
                </Text>
                <div className='absolute right-30 block lg:d-none'>
                    <LabelPairedXmarkLgRegularIcon onClick={() => navigate('/')} className='cursor-pointer' />
                </div>
            </div>
        </div>
    );
};

export default CompareAccountsHeader;
