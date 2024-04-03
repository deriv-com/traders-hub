import { useAuthData } from '@deriv-com/api-hooks';
import { FormatUtils } from '@deriv-com/utils';

import { useUIContext } from '@/providers';

import { useActiveDerivTradingAccount } from './useActiveDerivTradingAccount';
import useCFDAssets from './useCFDAssets';
import usePlatformAssets from './usePlatformAssets';
import { useSettings } from './useSettings';

/**
 * @description Get total balance of cfd and platform accounts
 * @returns data - Total balance of all cfd and platform accounts
 */
const useTotalAssets = () => {
    const { uiState } = useUIContext();
    const { regulation } = uiState;
    const { isAuthorized } = useAuthData();
    const { formatMoney } = FormatUtils;
    const { data: settingsData } = useSettings();
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();
    const {
        demoAccountBalance,
        fiatCurrency,
        isSuccess: isPlatformSuccess,
        realAccounts,
        totalRealPlatformBalance,
    } = usePlatformAssets(regulation);
    const { calculatedDemoBalance, calculatedRealBalance, isSuccess: isCFDSuccess } = useCFDAssets(regulation);

    const demoTotalBalance = demoAccountBalance + calculatedDemoBalance;

    const realTotalBalance = totalRealPlatformBalance + calculatedRealBalance;

    const totalBalance = activeTradingAccount?.is_virtual ? demoTotalBalance : realTotalBalance;

    const formattedTotalBalance = formatMoney(totalBalance, {
        currency: fiatCurrency,
        decimalPlaces: 2,
        locale: settingsData?.preferred_language ?? 'en',
    });

    return {
        //Returns the total balance of all accounts
        data: formattedTotalBalance,
        //Returns true if all the requests are successful
        isSuccess: isPlatformSuccess && isCFDSuccess && isAuthorized,
        realAccounts,
    };
};

export default useTotalAssets;
