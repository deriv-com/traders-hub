import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';

import { useActiveDerivTradingAccount } from './useActiveDerivTradingAccount';
import { useCFDAssets } from './useCFDAssets';
import { usePlatformAssets } from './usePlatformAssets';

/**
 *
 * @description This hook is used to get the total balance of the all the assets.
 * @example
 * const { formattedTotalBalance } = useTotalAssets();
 */
export const useTotalAssets = () => {
    const { calculatedDemoBalance, calculatedRealBalance } = useCFDAssets();
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const { totalDerivTradingAccountBalance, fiatCurrency } = usePlatformAssets();
    const { formatMoney } = FormatUtils;

    const totalDemoBalance = calculatedDemoBalance + totalDerivTradingAccountBalance.demo;

    const totalRealBalance = calculatedRealBalance + totalDerivTradingAccountBalance.real;

    const totalBalance = activeTrading?.isVirtual ? totalDemoBalance : totalRealBalance;

    const formattedTotalBalance = `${formatMoney(totalBalance, {
        currency: fiatCurrency as CurrencyConstants.Currency,
    })} ${fiatCurrency}`;

    return { formattedTotalBalance };
};
