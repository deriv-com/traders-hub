import { Fragment } from 'react/jsx-runtime';

import { useDevice } from '@deriv-com/ui';

import { AppContainer, TradersHubDesktopContent, TradersHubHeader, TradersHubMobileContent } from '@/components';
import { Modals } from '@/modals/Modals';

export const Homepage = () => {
    const { isDesktop } = useDevice();

    return (
        <Fragment>
            <AppContainer>
                <div className='space-y-24 pt-48'>
                    <div className='flex justify-between flex-wrap items-center'>
                        <TradersHubHeader />
                    </div>
                    {!isDesktop ? <TradersHubMobileContent /> : <TradersHubDesktopContent />}
                </div>
            </AppContainer>
            <Modals />
        </Fragment>
    );
};
