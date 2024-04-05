import { renderHook } from '@testing-library/react';

import { useUIContext } from '@/providers';

import { useRegulationFlags } from '../useRegulationFlags';
import { useActiveDerivTradingAccount, useDerivTradingAccountsList, useIsEuRegion, useLandingCompany } from '..';

jest.mock('@/providers', () => ({
    useUIContext: jest.fn(),
}));

jest.mock('../useActiveDerivTradingAccount', () => ({
    useActiveDerivTradingAccount: jest.fn(),
}));

jest.mock('../useDerivTradingAccountsList', () => ({
    useDerivTradingAccountsList: jest.fn(),
}));

jest.mock('../useIsEuRegion', () => ({
    useIsEuRegion: jest.fn(),
}));

jest.mock('../useLandingCompany', () => ({
    useLandingCompany: jest.fn(),
}));

describe('useRegulationFlags', () => {
    it('returns correct regulation flags', () => {
        (useUIContext as jest.Mock).mockReturnValue({
            uiState: {
                accountType: 'real',
                regulation: 'EU',
            },
        });
        (useIsEuRegion as jest.Mock).mockReturnValue(true);
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: {},
            isSuccess: true,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ broker: 'CR' }],
            isSuccess: true,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: {
                financial_company: { shortcode: 'svg' },
                gaming_company: { shortcode: 'svg' },
            },
            isSuccess: true,
        });

        const { result } = renderHook(() => useRegulationFlags());

        expect(result.current).toEqual({
            hasActiveDerivAccount: false,
            isEU: true,
            isEURealAccount: true,
            isHighRisk: true,
            isNonEU: true,
            isNonEURealAccount: true,
            isSuccess: true,
            noRealCRNonEUAccount: false,
            noRealMFEUAccount: true,
        });

        expect(useUIContext).toHaveBeenCalled();
    });

    it('returns isEU as true when isEUCountry is false but isEURegulation is true', () => {
        (useUIContext as jest.Mock).mockReturnValue({
            uiState: {
                accountType: 'real',
                regulation: 'EU',
            },
        });
        (useIsEuRegion as jest.Mock).mockReturnValue(false);
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: {},
            isSuccess: true,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ broker: 'CR' }],
            isSuccess: true,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: {
                financial_company: { shortcode: 'svg' },
                gaming_company: { shortcode: 'svg' },
            },
            isSuccess: true,
        });

        const { result } = renderHook(() => useRegulationFlags());

        expect(result.current).toEqual({
            hasActiveDerivAccount: false,
            isEU: true,
            isEURealAccount: true,
            isHighRisk: true,
            isNonEU: true,
            isNonEURealAccount: true,
            isSuccess: true,
            noRealCRNonEUAccount: false,
            noRealMFEUAccount: true,
        });

        expect(useUIContext).toHaveBeenCalled();
    });

    it('returns isNonEU as true when isHighRisk is false but isNonEURegulation is true', () => {
        (useUIContext as jest.Mock).mockReturnValue({
            uiState: {
                accountType: 'real',
                regulation: 'NonEU',
            },
        });
        (useIsEuRegion as jest.Mock).mockReturnValue(true);
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: {},
            isSuccess: true,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ broker: 'CR' }],
            isSuccess: true,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: {
                financial_company: { shortcode: 'svg' },
                gaming_company: { shortcode: 'svg' },
            },
            isSuccess: true,
        });

        const { result } = renderHook(() => useRegulationFlags());

        expect(result.current).toEqual({
            hasActiveDerivAccount: false,
            isEU: true,
            isEURealAccount: true,
            isHighRisk: true,
            isNonEU: true,
            isNonEURealAccount: true,
            isSuccess: true,
            noRealCRNonEUAccount: false,
            noRealMFEUAccount: true,
        });

        expect(useUIContext).toHaveBeenCalled();
    });

    it('should return true for isRealAccount if accountType is real and activeTradingAccount is not virtual', () => {
        (useUIContext as jest.Mock).mockReturnValue({
            uiState: {
                accountType: 'real',
                regulation: 'EU',
            },
        });
        (useIsEuRegion as jest.Mock).mockReturnValue(true);
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: { is_virtual: false },
            isSuccess: true,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ broker: 'CR' }],
            isSuccess: true,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: {
                financial_company: { shortcode: 'svg' },
                gaming_company: { shortcode: 'svg' },
            },
            isSuccess: true,
        });

        const { result } = renderHook(() => useRegulationFlags());

        expect(result.current.isEURealAccount).toBe(true);
    });
});
