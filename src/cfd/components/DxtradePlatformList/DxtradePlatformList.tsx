import { CFDPlatformLayout } from '@cfd/components';
import { AddedDxtradeAccountsList, AvailableDxtradeAccountsList } from '@cfd/flows';
import { useAuthData } from '@deriv-com/api-hooks';

import { TradingAppCardLoader } from '@/components';
import { useActiveDerivTradingAccount, useDxtradeAccountsList } from '@/hooks';
import { useUIContext } from '@/providers';
import { THooks } from '@/types';

export const DxtradePlatformList = () => {
    const { uiState } = useUIContext();
    const { accountType } = uiState;
    const { data: dxTradeAccounts, isFetchedAfterMount } = useDxtradeAccountsList();
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();
    const { isAuthorized } = useAuthData();

    const hasDxtradeAccount = dxTradeAccounts?.some(
        (account: THooks.DxtradeAccountsList) =>
            account.is_virtual === activeTradingAccount?.isVirtual && account.account_type === accountType
    );

    return (
        <CFDPlatformLayout title='Deriv X'>
            {!isAuthorized && <AvailableDxtradeAccountsList />}
            {!isFetchedAfterMount && isAuthorized && <TradingAppCardLoader />}
            {isFetchedAfterMount &&
                isAuthorized &&
                (hasDxtradeAccount ? <AddedDxtradeAccountsList /> : <AvailableDxtradeAccountsList />)}
        </CFDPlatformLayout>
    );
};
