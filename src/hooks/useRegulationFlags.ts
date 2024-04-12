import { useMemo } from 'react';

import { useAuthData, useWebsiteStatus } from '@deriv-com/api-hooks';

import { Regulation } from '@/constants';
import { isEuCountry } from '@/helpers';
import { useUIContext } from '@/providers';

import { useActiveDerivTradingAccount, useDerivTradingAccountsList, useIsEuRegion, useLandingCompany } from '.';

/**
 * @description A custom hook that returns regulation flags based on the regulation passed in
 * @param regulation 'EU' | 'Non-EU'
 * @returns  { isDemo: boolean, isEU: boolean, isEUReal: boolean, isNonEU: boolean, isNonEUReal: boolean }
 */
export const useRegulationFlags = () => {
    const { uiState } = useUIContext();
    const { accountType, regulation } = uiState;
    const isEUCountry = useIsEuRegion();
    const { data: activeTradingAccount, isSuccess: activeTradingAccountSuccess } = useActiveDerivTradingAccount();
    const { data: tradingAccountsList, isSuccess: tradingAccountListSuccess } = useDerivTradingAccountsList();
    const { data: landingCompany, isSuccess: landingCompanySuccess } = useLandingCompany();
    const { data: websiteStatusData } = useWebsiteStatus();
    const { isAuthorized } = useAuthData();

    const regulationFlags = useMemo(() => {
        const clientCountry = websiteStatusData?.clients_country;
        const isEUResidence = isEuCountry(clientCountry ?? '');

        if (!isAuthorized) {
            return {
                hasActiveDerivAccount: false,
                isEU: isEUResidence,
                isEURealAccount: false,
                isHighRisk: false,
                isNonEU: false,
                isNonEURealAccount: false,
                isSuccess: false,
                noRealCRNonEUAccount: false,
                noRealMFEUAccount: false,
            };
        }

        const isHighRisk =
            landingCompany?.financial_company?.shortcode === 'svg' &&
            landingCompany?.gaming_company?.shortcode === 'svg';

        const isEURegulation = regulation === Regulation.EU;
        const isNonEURegulation = regulation === Regulation.NonEU;

        const isEU = isEUCountry || isEURegulation;

        const isNonEU = isHighRisk || isNonEURegulation;

        const isRealAccount = !activeTradingAccount?.is_virtual || accountType === 'real';

        const isEURealAccount = isEU && isRealAccount;

        const isNonEURealAccount = isNonEU && isRealAccount;

        const noRealCRNonEUAccount =
            isNonEU && !tradingAccountsList?.find(account => account.broker === 'CR') && isRealAccount;

        const noRealMFEUAccount =
            isEU && !tradingAccountsList?.find(account => account.broker === 'MF') && isRealAccount;

        const hasActiveDerivAccount = !(noRealCRNonEUAccount || noRealMFEUAccount);

        const isSuccess = activeTradingAccountSuccess && tradingAccountListSuccess && landingCompanySuccess;

        return {
            hasActiveDerivAccount,
            isEU,
            isEURealAccount,
            isHighRisk,
            isNonEU,
            isNonEURealAccount,
            isSuccess,
            noRealCRNonEUAccount,
            noRealMFEUAccount,
        };
    }, [
        websiteStatusData?.clients_country,
        landingCompany?.financial_company?.shortcode,
        landingCompany?.gaming_company?.shortcode,
        regulation,
        isAuthorized,
        isEUCountry,
        activeTradingAccount?.is_virtual,
        accountType,
        tradingAccountsList,
        activeTradingAccountSuccess,
        tradingAccountListSuccess,
        landingCompanySuccess,
    ]);

    return { regulationFlags };
};
