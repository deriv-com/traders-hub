import { CTraderList, DxtradePlatformList, MT5PlatformsList } from '@cfd/components';

import { useRegulationFlags } from '@/hooks';

export const CFDContent = () => {
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;

    return (
        <div className='pt-16 space-y-16 lg:space-y-24 lg:pt-24'>
            <MT5PlatformsList />
            {!isEU && <CTraderList />}
            {!isEU && <DxtradePlatformList />}
        </div>
    );
};
