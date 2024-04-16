import { twMerge } from 'tailwind-merge';

import { Text, useDevice } from '@deriv-com/ui';

import { useActiveDerivTradingAccount, useTotalAssets } from '@/hooks';
import { setPerformanceValue } from '@/utils';

import { TotalAssetsLoader } from '../Loaders';

const TotalAssets = () => {
    const { data: activeDerivTradingAccount } = useActiveDerivTradingAccount();
    const { formattedTotalBalance } = useTotalAssets();
    const { isMobile } = useDevice();

    // need to add more conditions to show the loader and wait until all accounts are measured
    // or wait when BE team completes the task to measure TotalAssets on BE
    if (!formattedTotalBalance) {
        return <TotalAssetsLoader />;
    }

    setPerformanceValue('login_time', isMobile);
    setPerformanceValue('redirect_from_deriv_com_time', isMobile);
    setPerformanceValue('switch_currency_accounts_time', isMobile);
    setPerformanceValue('switch_from_demo_to_real_time', isMobile);
    setPerformanceValue('switch_from_real_to_demo_time', isMobile);

    return (
        <div className='relative lg:inline-block text-center lg:text-right w-full lg:w-auto flex justify-center mt-24 lg:mt-0'>
            <div className='d-none lg:block'>
                <Text size='sm'>Total assets</Text>
            </div>
            <Text
                as='p'
                className={twMerge(
                    'underline text-status-light-information decoration-dotted decoration-system-light-less-prominent-text underline-offset-8 flex flex-col items-end text-4xl',
                    !activeDerivTradingAccount?.is_virtual && 'text-status-light-success'
                )}
                weight='bold'
            >
                {formattedTotalBalance}
            </Text>
        </div>
    );
};

export default TotalAssets;
