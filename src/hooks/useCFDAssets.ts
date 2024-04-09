import { useMemo } from 'react';

import { useBalance } from './useBalance';
import { useCtraderAccountsList } from './useCtraderAccountsList';
import { useDxtradeAccountsList } from './useDxtradeAccountsList';

interface Account {
    is_virtual: boolean;
    balance: number;
}

const calculateBalance = (accountsList: Account[] | undefined, isVirtual: boolean) =>
    accountsList
        ?.filter(account => account.is_virtual === isVirtual)
        .reduce((acc, account) => acc + (account.balance || 0), 0) || 0;
/**
 *
 * @returns @description This hook is used to get the total balance of the CFD accounts.
 * @example
 * const { totalCFDDemoAccountBalance, totalCFDRealAccountBalance } = useCFDAssets();
 */

export const useCFDAssets = () => {
    const { data: balanceAll } = useBalance();
    const { data: ctraderAccountsList } = useCtraderAccountsList();
    const { data: dxtradeAccountsList } = useDxtradeAccountsList();

    const demoCTraderBalance = calculateBalance(ctraderAccountsList as Account[], true);
    const realCTraderBalance = calculateBalance(ctraderAccountsList as Account[], false);
    const demoDxtradeBalance = calculateBalance(dxtradeAccountsList as Account[], true);
    const realDxtradeBalance = calculateBalance(dxtradeAccountsList as Account[], false);

    const realMT5Balance = balanceAll.total?.mt5?.amount || 0;

    const demoMT5Balance = balanceAll.total?.mt5_demo?.amount || 0;

    const totalCFDAccountBalance = useMemo(() => {
        return {
            demo: demoCTraderBalance + demoDxtradeBalance + demoMT5Balance,
            real: realCTraderBalance + realDxtradeBalance + realMT5Balance,
        };
    }, [
        demoCTraderBalance,
        demoDxtradeBalance,
        demoMT5Balance,
        realCTraderBalance,
        realDxtradeBalance,
        realMT5Balance,
    ]);

    return totalCFDAccountBalance;
};
