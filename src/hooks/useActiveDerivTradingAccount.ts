import { useMemo } from 'react';

import { useDerivTradingAccountsList } from '.';

/**
 * Custom hook to get the active trading account
 * @returns {Object} activeTradingAccount - The active trading account
 * @returns {Object} rest - The rest of the props from useDerivTradingAccountsList
 *
 */
export const useActiveDerivTradingAccount = () => {
    const { data, ...rest } = useDerivTradingAccountsList();

    const activeTradingAccount = useMemo(() => {
        return data?.find(trading => trading.isActive);
    }, [data]);

    return { data: activeTradingAccount, ...rest };
};
