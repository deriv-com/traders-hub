import { Text } from '@deriv-com/ui';

import { DemoRealSwitcher } from '@/components';

import Checkmark from '../../assets/svgs/checkmark.svg?react';

export const TradersHubHeader = () => {
    return (
        <div className='flex flex-col gap-8 lg:flex-row w-1/2 lg:w-auto items-center'>
            <Text weight='bold' size='lg'>
                Trader&apos;s Hub
            </Text>
            <DemoRealSwitcher />
            <Checkmark />
        </div>
    );
};
