import { useSubscribe, useTradingPlatformAccounts } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useCtraderAccountsList } from '../useCtraderAccountsList';

jest.mock('@deriv-com/api-hooks', () => ({
    useTradingPlatformAccounts: jest.fn(),
    useSubscribe: jest.fn(),
}));

jest.mock('@deriv-com/utils', () => ({
    FormatUtils: {
        formatMoney: jest.fn((balance, { currency }) => `${balance} ${currency}`),
    },
    URLUtils: {
        getDerivStaticURL: jest.fn(),
    },
}));

describe('useCtraderAccountsList hook', () => {
    it('should return modified accounts with correct properties', () => {
        const mockData = [
            { account_id: '1', account_type: 'demo', balance: 1000, currency: 'USD', platform: 'ctrader' },
            { account_id: '2', account_type: 'real', balance: 2000, currency: 'EUR', platform: 'ctrader' },
        ];
        (useTradingPlatformAccounts as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        trading_platform_accounts: [
                            {
                                login: 'MT5ID12345',
                                account_type: 'demo',
                                balance: 1000,
                                currency: 'USD',
                            },
                        ],
                    },
                });
            }
            return { data: {} };
        });

        const { result } = renderHook(() => useCtraderAccountsList());

        expect(result.current.data).toEqual([
            {
                ...mockData[0],
                platform: 'ctrader',
                is_virtual: true,
                loginid: '1',
                display_balance: '1000 USD USD',
                convertedBalance: 1000,
            },
            {
                ...mockData[1],
                platform: 'ctrader',
                is_virtual: false,
                loginid: '2',
                display_balance: '2000 EUR EUR',
                convertedBalance: 2000,
            },
        ]);
    });

    it('should return undefined when there is no data', () => {
        (useTradingPlatformAccounts as jest.Mock).mockReturnValue({ data: undefined, rest: {} });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        trading_platform_accounts: [
                            {
                                login: 'MT5ID12345',
                                account_type: 'demo',
                                balance: 1000,
                                currency: 'USD',
                            },
                        ],
                    },
                });
            }
            return { data: {} };
        });

        const { result } = renderHook(() => useCtraderAccountsList());

        expect(result.current.data).toBeUndefined();
    });

    it('should return isPending as true when fetching data', () => {
        (useTradingPlatformAccounts as jest.Mock).mockReturnValue({ data: undefined, isPending: true, rest: {} });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        trading_platform_accounts: [
                            {
                                login: 'MT5ID12345',
                                account_type: 'demo',
                                balance: 1000,
                                currency: 'USD',
                            },
                        ],
                    },
                });
            }
            return { data: {} };
        });

        const { result } = renderHook(() => useCtraderAccountsList());

        expect(result.current.isPending).toBeTruthy();
        expect(result.current.data).toBeUndefined();
    });

    it('should return 0 when balance is undefined in the account', () => {
        const mockData = [{ account_id: '1', account_type: 'demo', currency: 'USD', platform: 'ctrader' }];
        (useTradingPlatformAccounts as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        trading_platform_accounts: [
                            {
                                login: 'MT5ID12345',
                                account_type: 'demo',
                                balance: 1000,
                                currency: 'USD',
                            },
                        ],
                    },
                });
            }
            return { data: {} };
        });

        const { result } = renderHook(() => useCtraderAccountsList());

        expect(result.current.data).toEqual([
            {
                ...mockData[0],
                platform: 'ctrader',
                is_virtual: true,
                loginid: '1',
                display_balance: '0 USD USD',
                convertedBalance: 0,
            },
        ]);
    });
});
