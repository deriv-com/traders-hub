// import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from '@deriv-com/ui';

import { TotalAssetsLoader } from '@/components';
import { useActiveDerivTradingAccount } from '@/hooks';
import useTotalAssets from '@/hooks/useTotalAssets';

const TotalAssets = () => {
    const { data: totalAssets, isSuccess } = useTotalAssets();
    const { data: activeDerivTradingAccount } = useActiveDerivTradingAccount();
    if (!isSuccess) return <TotalAssetsLoader />;

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
                {totalAssets}
            </Text>
        </div>
    );
};

export default TotalAssets;
