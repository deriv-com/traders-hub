import { twMerge } from 'tailwind-merge';

import { OptionsAndMultipliersSection } from '@/components';
import { useRegulationFlags } from '@/hooks';

export const TradersHubDesktopContent = () => {
    const { isEU } = useRegulationFlags();

    return (
        <div className={twMerge('flex gap-24 flex-col', isEU && 'flex-col-reverse')}>
            <OptionsAndMultipliersSection />
        </div>
    );
};
