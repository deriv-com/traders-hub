import { CFDPlatformLayout } from '@cfd/components';
import { PlatformDetails } from '@cfd/constants';
import { AddedMT5AccountsList, AvailableMT5AccountsList, LoggedOutMT5AccountsList } from '@cfd/flows';
import { useAuthData } from '@deriv-com/api-hooks';

import { TradingAppCardLoader } from '@/components';
import { useActiveDerivTradingAccount, useSortedMT5Accounts } from '@/hooks';
import { useUIContext } from '@/providers';
import { THooks } from '@/types';

export const MT5PlatformsList = () => {
    const { uiState } = useUIContext();
    const { isAuthorized } = useAuthData();
    const { accountType } = uiState;
    const { data: sortedMt5Accounts, isFetchedAfterMount } = useSortedMT5Accounts();
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();

    return (
        <CFDPlatformLayout title={PlatformDetails.mt5.title}>
            {!isAuthorized && <LoggedOutMT5AccountsList />}
            {!isFetchedAfterMount && isAuthorized && (
                <div className='pt-8 lg:pt-18'>
                    <TradingAppCardLoader />
                </div>
            )}
            {isFetchedAfterMount &&
                sortedMt5Accounts?.map(MT5Account => {
                    if (
                        MT5Account.is_added &&
                        MT5Account.is_virtual === !!activeTradingAccount?.is_virtual &&
                        MT5Account.account_type === accountType
                    )
                        return (
                            <AddedMT5AccountsList account={MT5Account} key={`added-mt5-list-${MT5Account.loginid}`} />
                        );

                    return (
                        <AvailableMT5AccountsList
                            account={MT5Account as unknown as THooks.MT5AccountsList}
                            key={`available-mt5-list-${MT5Account.market_type}-${MT5Account.leverage}`}
                        />
                    );
                })}
        </CFDPlatformLayout>
    );
};
