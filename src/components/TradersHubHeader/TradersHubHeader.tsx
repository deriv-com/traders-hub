import { Text } from '@deriv-com/ui';

import { DemoRealSwitcher } from '@/components';

export const TradersHubHeader = () => {
    return (
        <div className='flex flex-col gap-8 lg:flex-row w-1/2 lg:w-auto items-center'>
            <Text weight='bold'>Trader&apos;s Hub</Text>
            <DemoRealSwitcher />
        </div>
    );
};
