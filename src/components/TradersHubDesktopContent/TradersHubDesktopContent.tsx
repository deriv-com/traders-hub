import { twMerge } from 'tailwind-merge';

import { CFDSection, OptionsAndMultipliersSection } from '@/components';
import { useRegulationFlags } from '@/hooks';

export const TradersHubDesktopContent = () => {
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;

    return (
        <div
            className={twMerge('flex gap-24 flex-col', isEU && 'flex-col-reverse')}
            data-testid='traders-hub-desktop-content'
        >
            <OptionsAndMultipliersSection />
            <CFDSection />
        </div>
    );
};
