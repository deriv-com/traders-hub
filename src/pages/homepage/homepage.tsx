import { AppContainer, TradersHubDesktopContent, TradersHubHeader } from '@/components';

export const Homepage = () => {
    return (
        <AppContainer>
            <div className='space-y-24'>
                <div className='flex justify-between flex-wrap items-center'>
                    <TradersHubHeader />
                </div>
                <TradersHubDesktopContent />
            </div>
        </AppContainer>
    );
};
