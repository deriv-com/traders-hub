import { useMemo } from 'react';

import { useAccountList, useAuthData } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';

import { useBalance, useCurrencyConfig, useSettings } from '.';

/**
 * Custom hook to get a list of trading accounts
 * @returns {Object} tradingAccounts - List of trading accounts
 * @returns {Object} rest - The rest of the props from useAccountList
 */
export const useDerivTradingAccountsList = () => {
    const { data, ...rest } = useAccountList();
    const { data: balanceData } = useBalance();
    const { activeLoginid } = useAuthData();
    const { getConfig } = useCurrencyConfig();
    const { data: settingsData } = useSettings();

    const { formatMoney } = FormatUtils;

    const modifiedAccounts = useMemo(() => {
        return data?.map(account => {
            return {
                ...account,
                isActive: account.loginid === activeLoginid,
                /** Account's currency config information */
                currencyConfig: account.currency ? getConfig(account.currency) : undefined,
                /** indicating whether the account is a virtual-money account. */
                isVirtual: Boolean(account.is_virtual),
                /** The platform of the account */
                platform: 'deriv' as const,
            };
        });
    }, [data, activeLoginid, getConfig]);

    const modifiedAccountsWithBalance = useMemo(
        () =>
            modifiedAccounts?.map(account => {
                const balance = balanceData?.accounts?.[account.loginid]?.balance ?? 0;

                return {
                    ...account,
                    balance,
                    /** The balance of the account in currency format. */
                    displayBalance: `${formatMoney(balance, {
                        currency: account.currencyConfig?.display_code as CurrencyConstants.Currency,
                        decimalPlaces: account.currencyConfig?.fractional_digits ?? 2,
                        locale: settingsData?.preferred_language ?? 'en',
                    })} ${account.currencyConfig?.display_code}`,
                };
            }),
        [modifiedAccounts, balanceData?.accounts, formatMoney, settingsData?.preferred_language]
    );

    const fiat_account =
        modifiedAccounts?.find(account => getConfig(account.currency ?? '')?.isFiat)?.currency ?? 'USD';

    return { data: modifiedAccountsWithBalance, fiat_account, ...rest };
};
