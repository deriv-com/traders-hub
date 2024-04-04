import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';
import Cookies from 'js-cookie';

import { useAuthData } from '@deriv-com/api-hooks';
import { useDevice } from '@deriv-com/ui';

import { AppContainer, TradersHubDesktopContent, TradersHubHeader, TradersHubMobileContent } from '@/components';
import { TotalAssets } from '@/components/TotalAssets';
import { useActiveDerivTradingAccount, useRegulationFlags } from '@/hooks';
import { Modals } from '@/modals/Modals';

export const Homepage = () => {
    const { isDesktop } = useDevice();
    const { activeLoginid, isAuthorized } = useAuthData();
    const { hasActiveDerivAccount } = useRegulationFlags();
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const isDemo = activeTrading?.is_virtual;
    const isTotalAssetsVisible = hasActiveDerivAccount || isDemo;

    const setLoginCookie = (token: string) => {
        if (import.meta.env.MODE === 'production') {
            const pagesDomain = Cookies.set('authToken', token, { domain: 'pages.dev', path: '/' });
            const appDomain = Cookies.set('authToken', token, { domain: 'deriv.com', path: '/' });

            return !!pagesDomain || !!appDomain;
        }
        Cookies.set('authToken', token);
    };

    useEffect(() => {
        if (isAuthorized && activeLoginid) {
            const clientAccounts = JSON.parse(localStorage.getItem('client.account_list') ?? '[]');

            const activeAccount = clientAccounts.find(
                (account: { loginid: string; token: string }) => account.loginid === activeLoginid
            );

            setLoginCookie(activeAccount.token);
        }
    }, [isAuthorized, activeLoginid]);

    return (
        <Fragment>
            <AppContainer>
                <div className='space-y-24 pt-48'>
                    <div className='flex justify-between flex-wrap items-center'>
                        <TradersHubHeader />
                        {isTotalAssetsVisible && <TotalAssets />}
                    </div>
                    {!isDesktop ? <TradersHubMobileContent /> : <TradersHubDesktopContent />}
                </div>
            </AppContainer>
            <Modals />
        </Fragment>
    );
};
