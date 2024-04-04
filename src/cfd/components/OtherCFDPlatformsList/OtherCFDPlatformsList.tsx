import { CFDPlatformLayout } from '@cfd/components';
import { AddedDxtradeAccountsList, AvailableDxtradeAccountsList } from '@cfd/flows';

import { TradingAppCardLoader } from '@/components';
import { useActiveDerivTradingAccount, useDxtradeAccountsList } from '@/hooks';
import { useUIContext } from '@/providers';
import { THooks } from '@/types';

export const OtherCFDPlatformsList = () => {
    const { uiState } = useUIContext();
    const { accountType } = uiState;
    const { data: dxTradeAccounts, isFetchedAfterMount } = useDxtradeAccountsList();
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();

    const hasDxtradeAccount = dxTradeAccounts?.some(
        (account: THooks.DxtradeAccountsList) =>
            account.is_virtual === activeTradingAccount?.isVirtual && account.account_type === accountType
    );

    return (
        <CFDPlatformLayout title='Other CFD Platforms'>
            {!isFetchedAfterMount && <TradingAppCardLoader />}
            {isFetchedAfterMount &&
                (hasDxtradeAccount ? <AddedDxtradeAccountsList /> : <AvailableDxtradeAccountsList />)}
        </CFDPlatformLayout>
    );
};
