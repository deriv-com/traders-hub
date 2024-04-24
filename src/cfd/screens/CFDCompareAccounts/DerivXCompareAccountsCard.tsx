import { useMemo } from 'react';

import { useActiveDerivTradingAccount, useCFDAccountsList, useCFDCompareAccounts, useRegulationFlags } from '@/hooks';

import CFDCompareAccountsCard from './CompareAccountsCard';
import { isDxtradeAccountAdded } from './CompareAccountsConfig';

const DerivXCompareAccountsCard = () => {
    const { data: activeDerivTrading } = useActiveDerivTradingAccount();

    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;
    const { is_virtual: isDemo = false } = activeDerivTrading ?? {};

    const { data: cfdAccounts } = useCFDAccountsList();

    const { data: compareAccounts, hasDxtradeAccountAvailable } = useCFDCompareAccounts();

    const { dxtradeAccount } = compareAccounts;

    const isDxtradeAdded = useMemo(
        () => !!cfdAccounts && isDxtradeAccountAdded(cfdAccounts.dxtrade, !!isDemo),
        [cfdAccounts, isDemo]
    );

    if (isEU || !hasDxtradeAccountAvailable || !dxtradeAccount) return null;

    return (
        <CFDCompareAccountsCard
            isAccountAdded={isDxtradeAdded}
            marketType={dxtradeAccount.market_type}
            platform={dxtradeAccount.platform}
            shortCode={dxtradeAccount.shortcode}
        />
    );
};

export default DerivXCompareAccountsCard;
