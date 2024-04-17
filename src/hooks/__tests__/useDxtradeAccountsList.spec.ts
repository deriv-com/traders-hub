import { useSubscribe, useTradingPlatformAccounts } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';
import { renderHook } from '@testing-library/react';

import { useDxtradeAccountsList } from '../useDxtradeAccountsList';

jest.mock('@deriv-com/api-hooks', () => ({
    useTradingPlatformAccounts: jest.fn(),
    useSubscribe: jest.fn(),
}));

describe('useDxtradeAccountsList', () => {
    it('returns modified accounts data', () => {
        const mockData = [
            {
                account_type: 'demo',
                balance: 1000,
                currency: 'USD',
                platform: 'dxtrade',
            },
        ];

        (useTradingPlatformAccounts as jest.Mock).mockReturnValue({
            data: mockData,
        });

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

        const { result } = renderHook(() => useDxtradeAccountsList());

        const expectedData = mockData.map(account => ({
            ...account,
            platform: 'dxtrade',
            is_virtual: account.account_type === 'demo',
            display_balance: `${FormatUtils.formatMoney(account.balance, {
                currency: account.currency as CurrencyConstants.Currency,
            })} ${account.currency}`,
            convertedBalance: 1000,
        }));

        expect(result.current.data).toEqual(expectedData);
    });

    it('should return 0 if balance is not provided', () => {
        const mockData = [
            {
                account_type: 'demo',
                currency: 'USD',
                platform: 'dxtrade',
            },
            {
                account_type: 'real',
                currency: 'EUR',
                platform: 'dxtrade',
            },
        ];

        (useTradingPlatformAccounts as jest.Mock).mockReturnValue({
            data: mockData,
        });

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

        const { result } = renderHook(() => useDxtradeAccountsList());

        const expectedData = mockData.map(account => ({
            ...account,
            platform: 'dxtrade',
            is_virtual: account.account_type === 'demo',
            display_balance: `0.00 ${account.currency}`,
            convertedBalance: 0,
        }));

        expect(result.current.data).toEqual(expectedData);
    });
});
