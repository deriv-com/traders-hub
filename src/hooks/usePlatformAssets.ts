import { useMemo } from 'react';

import { BrokerCodes, Regulation } from '@/constants';
import { useUIContext } from '@/providers';

import { useBalance } from './useBalance';
import { useDerivTradingAccountsList } from './useDerivTradingAccountsList';

/**
 *
 * @returns @description This hook is used to get the total balance of the Deriv Trading accounts.
 * @example
 * const { totalDerivTradingDemoAccountBalance, totalDerivTradingRealAccountBalance } = usePlatformAssets();
 */
export const usePlatformAssets = () => {
    const { data: balanceAll } = useBalance();
    const { data: tradingAccount, fiatAccount: firstFiatCurrency } = useDerivTradingAccountsList();

    const { uiState } = useUIContext();

    const { regulation } = uiState;

    const isEURegulation = regulation === Regulation.EU;

    const fiatCurrency = isEURegulation
        ? tradingAccount?.find(account => account.broker === BrokerCodes.MF)?.currency
        : firstFiatCurrency;

    const totalDerivTradingAccountBalance = useMemo(() => {
        const total = balanceAll.total ?? {};

        return {
            demo: total.deriv_demo?.amount || 0,
            real: total.deriv?.amount || 0,
        };
    }, [balanceAll.total]);

    return { totalDerivTradingAccountBalance, fiatCurrency };
};
