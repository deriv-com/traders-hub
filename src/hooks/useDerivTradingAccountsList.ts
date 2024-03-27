import { useAccountList, useAppData } from '@deriv-com/api-hooks';

/**
 * Custom hook to get a list of trading accounts
 * @returns {Object} tradingAccounts - List of trading accounts
 * @returns {Object} rest - The rest of the props from useAccountList
 */
export const useDerivTradingAccountsList = () => {
    const { data, ...rest } = useAccountList();
    const { activeLoginid } = useAppData();

    const modifiedAccounts = data?.map(account => {
        return {
            ...account,
            isActive: account.loginid === activeLoginid,
        };
    });

    return { data: modifiedAccounts, ...rest };
};
