import { useMemo } from 'react';

import { useActiveDerivTradingAccount, useCFDAccountsList, useCFDCompareAccounts, useRegulationFlags } from '@/hooks';

import CFDCompareAccountsCard from './CompareAccountsCard';
import { isCTraderAccountAdded } from './CompareAccountsConfig';

const CTraderCompareAccountsCard = () => {
    const { data: activeDerivTrading } = useActiveDerivTradingAccount();
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;

    const { data: compareAccounts, hasCTraderAccountAvailable } = useCFDCompareAccounts();

    const { is_virtual: isDemo = false } = activeDerivTrading ?? {};

    const { data: cfdAccounts } = useCFDAccountsList();

    const { ctraderAccount } = compareAccounts;

    const isCtraderAdded = useMemo(
        () => !!cfdAccounts && isCTraderAccountAdded(cfdAccounts.ctrader, !!isDemo),
        [cfdAccounts, isDemo]
    );

    if (isEU || !hasCTraderAccountAvailable || !ctraderAccount) return null;

    return (
        <CFDCompareAccountsCard
            isAccountAdded={isCtraderAdded}
            marketType={ctraderAccount.market_type}
            platform={ctraderAccount.platform}
            shortCode={ctraderAccount.shortcode}
        />
    );
};

export default CTraderCompareAccountsCard;
