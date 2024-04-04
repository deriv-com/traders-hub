import { useGetSettings, useLandingCompany } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useIsDIELEnabled } from '../useIsDIELEnabled';

jest.mock('@deriv-com/api-hooks', () => ({
    __esModule: true,
    useLandingCompany: jest.fn(),
    useGetSettings: jest.fn(),
}));

jest.mock('@/assets/cfd/ctrader-success.svg?react', () => ({
    __esModule: true,
    default: () => 'CTraderSuccess',
}));

jest.mock('@/assets/cfd/dxtrade-success.svg?react', () => ({
    __esModule: true,
    default: () => 'DerivXSuccess',
}));

jest.mock('@/assets/cfd/mt5-derived-success.svg?react', () => ({
    __esModule: true,
    default: () => 'MT5DerivedSuccess',
}));

jest.mock('@deriv-com/ui', () => ({
    useIsMounted: () => ({
        isMounted: jest.fn(),
    }),
}));

describe('useIsDIELEnabled', () => {
    it('returns true if the DIEL landing company is enabled', () => {
        const mockData = {
            financial_company: { shortcode: 'maltainvest' },
            gaming_company: { shortcode: 'svg' },
        };

        (useLandingCompany as jest.Mock).mockReturnValue({
            data: mockData,
        });

        (useGetSettings as jest.Mock).mockReturnValue({
            data: {
                account_settings: {
                    is_authenticated: true,
                },
            },
        });

        const { result } = renderHook(() => useIsDIELEnabled());

        expect(result.current.data).toBe(true);
    });

    it('returns false if the DIEL landing company is not enabled', () => {
        const mockData = {
            financial_company: { shortcode: 'other' },
            gaming_company: { shortcode: 'other' },
        };

        (useLandingCompany as jest.Mock).mockReturnValue({
            data: mockData,
        });

        (useGetSettings as jest.Mock).mockReturnValue({
            data: {
                account_settings: {
                    is_authenticated: true,
                },
            },
        });

        const { result } = renderHook(() => useIsDIELEnabled());

        expect(result?.current?.data).toBe(false);
    });
});
