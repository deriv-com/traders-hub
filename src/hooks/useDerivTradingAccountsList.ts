import { useMemo } from 'react';

import { useAccountList, useAppData } from '@deriv-com/api-hooks';

import { useBalance } from '.';

/**
 * Custom hook to get a list of trading accounts
 * @returns {Object} tradingAccounts - List of trading accounts
 * @returns {Object} rest - The rest of the props from useAccountList
 */
export const useDerivTradingAccountsList = () => {
    const { data, ...rest } = useAccountList();
    const { data: balanceData } = useBalance();
    const { activeLoginid } = useAppData();

    const modifiedAccounts = useMemo(() => {
        return data?.map(account => {
            return {
                ...account,
                isActive: account.loginid === activeLoginid,
            };
        });
    }, [data, activeLoginid]);

    const modifiedAccountsWithBalance = useMemo(
        () =>
            modifiedAccounts?.map(account => {
                const balance = balanceData?.accounts?.[account.loginid]?.balance ?? 0;

                return {
                    ...account,
                    balance,
                };
            }),
        [modifiedAccounts, balanceData]
    );

    return { data: modifiedAccountsWithBalance, ...rest };
};
