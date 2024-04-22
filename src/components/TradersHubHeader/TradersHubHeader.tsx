import { Text } from '@deriv-com/ui';

import { DemoRealSwitcher } from '@/components';
import { useNewVirtualAccount } from '@/hooks';

export const TradersHubHeader = () => {
    const { mutate } = useNewVirtualAccount();
    return (
        <div className='flex flex-col gap-4 lg:flex-row w-1/2 lg:w-auto'>
            <Text weight='bold' size='lg'>
                Trader&apos;s Hub
            </Text>
            <DemoRealSwitcher />
            <button onClick={mutate}>Signup</button>
        </div>
    );
};
