import { useAccountList, useAuthData } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useBalance } from '../useBalance';
import { useCurrencyConfig } from '../useCurrencyConfig';
import { useDerivTradingAccountsList } from '../useDerivTradingAccountsList';
import { useSettings } from '../useSettings';

jest.mock('@deriv-com/api-hooks');
jest.mock('../useBalance');
jest.mock('../useCurrencyConfig');
jest.mock('../useSettings');

jest.mock('@deriv-com/ui', () => ({
    useIsMounted: () => ({
        isMounted: jest.fn(),
    }),
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

describe('useDerivTradingAccountsList', () => {
    it('returns the expected data structure', async () => {
        (useAccountList as jest.Mock).mockReturnValue({
            data: [{ loginid: '123', currency: 'USD', is_virtual: false }],
        });
        (useAuthData as jest.Mock).mockReturnValue({
            activeLoginid: '123',
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: jest.fn().mockReturnValue({ display_code: 'USD', fractional_digits: 2 }),
        });
        (useBalance as jest.Mock).mockReturnValue({
            data: { accounts: { '123': { balance: 1000 } } },
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { preferred_language: 'en' },
        });

        const { result } = renderHook(() => useDerivTradingAccountsList());

        expect(result.current.data).toEqual([
            {
                loginid: '123',
                currency: 'USD',
                is_virtual: false,
                isActive: true,
                currencyConfig: { display_code: 'USD', fractional_digits: 2 },
                isVirtual: false,
                platform: 'deriv',
                balance: 1000,
                displayBalance: '1,000.00 USD',
            },
        ]);
    });

    it(' should return undefined if currency is not found', async () => {
        (useAccountList as jest.Mock).mockReturnValue({
            data: [{ loginid: '123', currency: undefined, is_virtual: false }],
        });
        (useAuthData as jest.Mock).mockReturnValue({
            activeLoginid: '123',
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: jest.fn().mockReturnValue(undefined),
        });
        (useBalance as jest.Mock).mockReturnValue({
            data: { accounts: { '123': { balance: 1000 } } },
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { preferred_language: 'en' },
        });

        const { result } = renderHook(() => useDerivTradingAccountsList());

        expect(result.current.data).toEqual([
            {
                loginid: '123',
                currency: undefined,
                is_virtual: false,
                isActive: true,
                currencyConfig: undefined,
                isVirtual: false,
                platform: 'deriv',
                balance: 1000,
                displayBalance: '1,000.00 undefined',
            },
        ]);
    });

    it('uses fallback for decimalPlaces when fractional_digits is not provided', () => {
        (useAccountList as jest.Mock).mockReturnValue({
            data: [{ loginid: '123', currency: 'USD', is_virtual: false }],
        });
        (useAuthData as jest.Mock).mockReturnValue({
            activeLoginid: '123',
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: jest.fn().mockReturnValue({ display_code: 'USD' }),
        });
        (useBalance as jest.Mock).mockReturnValue({
            data: { accounts: { '123': { balance: 1000 } } },
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { preferred_language: 'en' },
        });

        const { result } = renderHook(() => useDerivTradingAccountsList());

        expect(result.current.data).toEqual([
            {
                loginid: '123',
                currency: 'USD',
                is_virtual: false,
                isActive: true,
                currencyConfig: { display_code: 'USD' },
                isVirtual: false,
                platform: 'deriv',
                balance: 1000,
                displayBalance: '1,000.00 USD',
            },
        ]);
    });

    it('should fallback to en when preferred_language is not provided', () => {
        (useAccountList as jest.Mock).mockReturnValue({
            data: [{ loginid: '123', currency: 'USD', is_virtual: false }],
        });
        (useAuthData as jest.Mock).mockReturnValue({
            activeLoginid: '123',
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: jest.fn().mockReturnValue({ display_code: 'USD', fractional_digits: 2 }),
        });
        (useBalance as jest.Mock).mockReturnValue({
            data: { accounts: { '123': { balance: 1000 } } },
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { preferred_language: undefined },
        });

        const { result } = renderHook(() => useDerivTradingAccountsList());

        expect(result.current.data).toEqual([
            {
                loginid: '123',
                currency: 'USD',
                is_virtual: false,
                isActive: true,
                currencyConfig: { display_code: 'USD', fractional_digits: 2 },
                isVirtual: false,
                platform: 'deriv',
                balance: 1000,
                displayBalance: '1,000.00 USD',
            },
        ]);
    });

    it('should return 0 balance if balance is not provided', async () => {
        (useAccountList as jest.Mock).mockReturnValue({
            data: [{ loginid: '123', currency: 'USD', is_virtual: false }],
        });
        (useAuthData as jest.Mock).mockReturnValue({
            activeLoginid: '123',
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: jest.fn().mockReturnValue({ display_code: 'USD', fractional_digits: 2 }),
        });
        (useBalance as jest.Mock).mockReturnValue({
            data: { accounts: { '123': { balance: undefined } } },
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { preferred_language: 'en' },
        });

        const { result } = renderHook(() => useDerivTradingAccountsList());

        expect(result.current.data).toEqual([
            {
                loginid: '123',
                currency: 'USD',
                is_virtual: false,
                isActive: true,
                currencyConfig: { display_code: 'USD', fractional_digits: 2 },
                isVirtual: false,
                platform: 'deriv',
                balance: 0,
                displayBalance: '0.00 USD',
            },
        ]);
    });
});
