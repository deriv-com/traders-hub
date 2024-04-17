import { Localize } from '@deriv-com/translations';
import { Text } from '@deriv-com/ui';

import { DemoRealSwitcher } from '@/components';

export const TradersHubHeader = () => {
    return (
        <div className='flex flex-col gap-4 lg:flex-row w-1/2 lg:w-auto'>
            <Text weight='bold' size='lg'>
                <Localize i18n_default_text="Trader's Hub" />
            </Text>
            <DemoRealSwitcher />
        </div>
    );
};
