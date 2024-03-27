import { useDerivTradingAccountsList } from './useDerivTradingAccountsList';

/**
 * Custom hook to get the active trading account
 * @returns {Object} activeTradingAccount - The active trading account
 * @returns {Object} rest - The rest of the props from useDerivTradingAccountsList
 *
 */
export const useActiveDerivTradingAccount = () => {
    const { data, ...rest } = useDerivTradingAccountsList();

    const activeTradingAccount = data?.find(trading => trading.isActive);

    return { data: activeTradingAccount, ...rest };
};
