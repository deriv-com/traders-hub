import { useCtraderAccountsList } from './useCtraderAccountsList';
import { useDxtradeAccountsList } from './useDxtradeAccountsList';
import { useMT5AccountsList } from './useMT5AccountsList';

/**
 * @description This hook is used to get the total demo and real CFD balance
 * @example
 * const { totalRealCFDBalance, totalDemoCFDBalance, isSuccess } = useCFDAssets(regulation);
 */
const useCFDAssets = (regulation?: string) => {
    const { data: mt5Accounts, isSuccess: isMT5AcccounrSuccess } = useMT5AccountsList();
    const demoMT5AccountBalance = mt5Accounts?.find(account => account.is_virtual)?.converted_balance ?? 0;

    const isEURegulation = regulation === 'EU';

    const realMT5AccountBalance =
        mt5Accounts
            ?.filter(account => {
                if (isEURegulation) {
                    return !account.is_virtual && account.landing_company_short === 'maltainvest';
                }
                return !account.is_virtual && account.landing_company_short !== 'maltainvest';
            })
            .reduce((total, account) => total + account.converted_balance, 0) ?? 0;

    // Calculate Dxtrade account balances
    const { data: dxtradeAccounts } = useDxtradeAccountsList();
    const demoDxtradeAccountBalance = dxtradeAccounts?.find(account => account.is_virtual)?.converted_balance ?? 0;
    const realDxtradeAccountBalance = dxtradeAccounts?.find(account => !account.is_virtual)?.converted_balance ?? 0;

    // Calculate Ctrader account balances
    const { data: ctraderAccounts } = useCtraderAccountsList();
    const ctraderDemoAccountBalance = ctraderAccounts?.find(account => account.is_virtual)?.converted_balance ?? 0;
    const ctraderRealAccountBalance = ctraderAccounts?.find(account => !account.is_virtual)?.converted_balance ?? 0;

    // Calculate total real and demo CFD balances
    const totalRealCFDBalance = realMT5AccountBalance + realDxtradeAccountBalance + ctraderRealAccountBalance;
    const totalDemoCFDBalance = demoMT5AccountBalance + demoDxtradeAccountBalance + ctraderDemoAccountBalance;

    // Calculate final real and demo balances based on regulation
    const calculatedRealBalance = isEURegulation ? realMT5AccountBalance : totalRealCFDBalance;
    const calculatedDemoBalance = isEURegulation ? demoMT5AccountBalance : totalDemoCFDBalance;

    return {
        calculatedDemoBalance,
        calculatedRealBalance,
        isSuccess: isMT5AcccounrSuccess,
    };
};

export default useCFDAssets;
