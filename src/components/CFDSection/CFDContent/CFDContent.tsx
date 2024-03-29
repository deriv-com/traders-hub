import { MT5PlatformsList } from '@cfd/components';

import { TradingAppCardLoader } from '@/components';
import { useRegulationFlags } from '@/hooks';

export const CFDContent = () => {
    const { isSuccess: isRegulationAccessible } = useRegulationFlags();

    if (!isRegulationAccessible)
        return (
            <div className='pt-16 lg:pt-24'>
                <TradingAppCardLoader />
            </div>
        );

    return (
        <div className='pt-16 space-y-16 lg:space-y-24 lg:pt-24'>
            <MT5PlatformsList />
        </div>
    );
};
