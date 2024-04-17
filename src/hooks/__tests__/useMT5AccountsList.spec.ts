import { useMt5LoginList, useSubscribe } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';
import { renderHook } from '@testing-library/react';

import { useCurrencyConfig } from '../useCurrencyConfig';
import { useMT5AccountsList } from '../useMT5AccountsList';

jest.mock('@deriv-com/api-hooks', () => ({
    useMt5LoginList: jest.fn(),
    useSubscribe: jest.fn(),
}));

jest.mock('../useCurrencyConfig', () => ({
    useCurrencyConfig: jest.fn(),
}));

describe('useMT5AccountsList', () => {
    it('should return modified accounts data', () => {
        const mockData = [
            {
                login: 'MT5ID12345',
                account_type: 'demo',
                balance: 1000,
                currency: 'USD',
            },
        ];
        const mockConfig = {
            symbol: '$',
        };

        (useMt5LoginList as jest.Mock).mockReturnValue({
            data: mockData,
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: () => mockConfig,
        });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        mt5_login_list: [
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

        const { result } = renderHook(() => useMT5AccountsList());

        expect(result.current.data).toEqual([
            {
                ...mockData[0],
                currencyConfig: mockConfig,
                display_login: '5ID12345',
                platform: 'mt5',
                is_virtual: true,
                loginid: 'MT5ID12345',
                display_balance: `${FormatUtils.formatMoney(mockData[0].balance, {
                    currency: mockData[0].currency as CurrencyConstants.Currency,
                })} ${mockData[0].currency}`,
                convertedBalance: 1000,
            },
        ]);
    });

    it('should return undefined for currencyConfig if currency is not found', () => {
        const mockData = [
            {
                login: 'MT5ID12345',
                account_type: 'demo',
                balance: 1000,
                currency: undefined,
            },
        ];

        (useMt5LoginList as jest.Mock).mockReturnValue({
            data: mockData,
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: () => undefined,
        });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        mt5_login_list: [
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

        const { result } = renderHook(() => useMT5AccountsList());

        expect(result.current.data).toEqual([
            {
                ...mockData[0],
                currencyConfig: undefined,
                display_login: '5ID12345',
                platform: 'mt5',
                is_virtual: true,
                loginid: 'MT5ID12345',
                display_balance: `${FormatUtils.formatMoney(mockData[0].balance, {
                    currency: mockData[0].currency as CurrencyConstants.Currency | undefined,
                })} ${mockData[0].currency}`,
                convertedBalance: 1000,
            },
        ]);
    });

    it('should return 0 balance if balance is not found', () => {
        const mockData = [
            {
                login: 'MT5ID12345',
                account_type: 'demo',
                currency: 'USD',
            },
        ];
        const mockConfig = {
            symbol: '$',
        };

        (useMt5LoginList as jest.Mock).mockReturnValue({
            data: mockData,
        });
        (useCurrencyConfig as jest.Mock).mockReturnValue({
            getConfig: () => mockConfig,
        });

        (useSubscribe as jest.Mock).mockImplementation((_, cb) => {
            if (typeof cb === 'function') {
                cb({
                    data: {
                        mt5_login_list: [
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

        const { result } = renderHook(() => useMT5AccountsList());

        expect(result.current.data).toEqual([
            {
                ...mockData[0],
                currencyConfig: mockConfig,
                display_login: '5ID12345',
                platform: 'mt5',
                is_virtual: true,
                loginid: 'MT5ID12345',
                display_balance: `${FormatUtils.formatMoney(0, {
                    currency: mockData[0].currency as CurrencyConstants.Currency,
                })} ${mockData[0].currency}`,
                convertedBalance: 0,
            },
        ]);
    });
});
