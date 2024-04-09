import { CFDPlatformLayout } from '@cfd/components';
import { PlatformDetails } from '@cfd/constants';
import { AddedCTraderAccountsList, AvailableCTraderAccountsList } from '@cfd/flows';
import { useAuthData } from '@deriv-com/api-hooks';

import { TradingAppCardLoader } from '@/components';
import { useActiveDerivTradingAccount, useCtraderAccountsList } from '@/hooks';
import { useUIContext } from '@/providers';
import { THooks } from '@/types';

export const CTraderList = () => {
    const { uiState } = useUIContext();
    const { accountType } = uiState;
    const { data: cTraderAccounts, isFetchedAfterMount } = useCtraderAccountsList();
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();
    const { isAuthorized } = useAuthData();

    const hasCTraderAccount = cTraderAccounts?.some(
        (account: THooks.CtraderAccountsList) =>
            account.is_virtual === activeTradingAccount?.isVirtual && account.account_type === accountType
    );

    return (
        <CFDPlatformLayout title={PlatformDetails.ctrader.title}>
            {!isAuthorized && <AvailableCTraderAccountsList />}
            {!isFetchedAfterMount && isAuthorized && <TradingAppCardLoader />}
            {isFetchedAfterMount &&
                isAuthorized &&
                (hasCTraderAccount ? <AddedCTraderAccountsList /> : <AvailableCTraderAccountsList />)}
        </CFDPlatformLayout>
    );
};
