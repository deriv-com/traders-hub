import { useDevice } from '@deriv-com/ui';

import { AppContainer, TradersHubDesktopContent, TradersHubHeader, TradersHubMobileContent } from '@/components';

export const Homepage = () => {
    const { isDesktop } = useDevice();

    return (
        <AppContainer>
            <div className='space-y-24'>
                <div className='flex justify-between flex-wrap items-center'>
                    <TradersHubHeader />
                </div>
                {!isDesktop ? <TradersHubMobileContent /> : <TradersHubDesktopContent />}
            </div>
        </AppContainer>
    );
};
