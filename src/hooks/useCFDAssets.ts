import { Jurisdiction } from '@/cfd';
import { Regulation } from '@/constants';
import { useUIContext } from '@/providers';

import { useCtraderAccountsList } from './useCtraderAccountsList';
import { useDxtradeAccountsList } from './useDxtradeAccountsList';
import { useMT5AccountsList } from './useMT5AccountsList';

/**
 *
 * @returns @description This hook is used to get the total balance of the CFD accounts.
 * @example
 * const { totalCFDDemoAccountBalance, totalCFDRealAccountBalance } = useCFDAssets();
 */
export const useCFDAssets = () => {
    const { data: mt5AccountsList } = useMT5AccountsList();
    const { uiState } = useUIContext();
    const { data: ctraderAccountsList } = useCtraderAccountsList();
    const { data: dxtradeAccountsList } = useDxtradeAccountsList();
    const { regulation } = uiState;
    const isEURegulation = regulation === Regulation.EU;

    const demoMT5AccountBalance =
        mt5AccountsList
            ?.filter(account => account.is_virtual)
            .reduce((total, account) => total + account.convertedBalance, 0) ?? 0;

    const realMT5AccountBalance =
        mt5AccountsList
            ?.filter(account => {
                if (isEURegulation) {
                    return !account.is_virtual && account.landing_company_short === Jurisdiction.MALTAINVEST;
                }
                return !account.is_virtual && account.landing_company_short !== Jurisdiction.MALTAINVEST;
            })
            .reduce((total, account) => total + account.convertedBalance, 0) ?? 0;

    const demoDxtradeAccountBalance = dxtradeAccountsList?.find(account => account.is_virtual)?.convertedBalance ?? 0;
    const realDxtradeAccountBalance = dxtradeAccountsList?.find(account => !account.is_virtual)?.convertedBalance ?? 0;

    // Calculate Ctrader account balances
    const ctraderDemoAccountBalance = ctraderAccountsList?.find(account => account.is_virtual)?.convertedBalance ?? 0;
    const ctraderRealAccountBalance = ctraderAccountsList?.find(account => !account.is_virtual)?.convertedBalance ?? 0;

    // Calculate total real and demo CFD balances
    const totalRealCFDBalance = realMT5AccountBalance + realDxtradeAccountBalance + ctraderRealAccountBalance;
    const totalDemoCFDBalance = demoMT5AccountBalance + demoDxtradeAccountBalance + ctraderDemoAccountBalance;

    // Calculate final real and demo balances based on regulation
    const calculatedRealBalance = isEURegulation ? realMT5AccountBalance : totalRealCFDBalance;
    const calculatedDemoBalance = isEURegulation ? demoMT5AccountBalance : totalDemoCFDBalance;

    return {
        calculatedDemoBalance,
        calculatedRealBalance,
    };
};
