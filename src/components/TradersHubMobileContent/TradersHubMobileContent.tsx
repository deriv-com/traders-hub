import { Tab, Tabs } from '@deriv-com/ui';

import { CFDSection, OptionsAndMultipliersSection } from '@/components';

export const TradersHubMobileContent = () => {
    return (
        <Tabs className='w-full p-4 rounded-sm'>
            <Tab className='px-8 py-6 rounded-xs' title='Options & Multipliers'>
                <OptionsAndMultipliersSection />
            </Tab>

            <Tab className='px-8 py-6 rounded-xs' title='CFDs'>
                <CFDSection />
            </Tab>
        </Tabs>
    );
};
