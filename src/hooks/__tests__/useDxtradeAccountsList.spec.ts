import { useTradingPlatformAccounts } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';
import { renderHook } from '@testing-library/react';

import { useDxtradeAccountsList } from '../useDxtradeAccountsList';

jest.mock('@deriv-com/api-hooks');

describe('useDxtradeAccountsList', () => {
  it('returns modified accounts data', () => {
    const mockData = [
      {
        account_type: 'demo',
        balance: 1000,
        currency: 'USD',
      },
      {
        account_type: 'real',
        balance: 2000,
        currency: 'EUR',
      },
    ];

    (useTradingPlatformAccounts as jest.Mock).mockReturnValue({
      data: mockData,
    });

    const { result } = renderHook(() => useDxtradeAccountsList());

    const expectedData = mockData.map(account => ({
      ...account,
      platform: 'dxtrade',
      is_virtual: account.account_type === 'demo',
      display_balance: `${FormatUtils.formatMoney(account.balance, {
        currency: account.currency as CurrencyConstants.Currency,
      })} ${account.currency}`,
    }));

    expect(result.current.data).toEqual(expectedData);
  });

  it('should return 0 if balance is not provided', () => {
    const mockData = [
      {
        account_type: 'demo',
        currency: 'USD',
      },
      {
        account_type: 'real',
        currency: 'EUR',
      },
    ];

    (useTradingPlatformAccounts as jest.Mock).mockReturnValue({
      data: mockData,
    });

    const { result } = renderHook(() => useDxtradeAccountsList());

    const expectedData = mockData.map(account => ({
      ...account,
      platform: 'dxtrade',
      is_virtual: account.account_type === 'demo',
      display_balance: `0.00 ${account.currency}`,
    }));

    expect(result.current.data).toEqual(expectedData);
  });
});
