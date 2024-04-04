import { useTradingPlatformAvailableAccounts } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useAvailableMT5Accounts } from '../useAvailableMT5Accounts';

jest.mock('@deriv-com/api-hooks', () => ({
  useTradingPlatformAvailableAccounts: jest.fn(),
}));

describe('useAvailableMT5Accounts hook', () => {
  it('should return modified accounts with correct properties', () => {
    const mockData = [{ market_type: 'gaming' }, { market_type: 'financial' }];
    (useTradingPlatformAvailableAccounts as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

    const { result } = renderHook(() => useAvailableMT5Accounts());

    expect(result.current.data).toEqual([
      { market_type: 'synthetic', platform: 'mt5', leverage: 500 },
      { market_type: 'financial', platform: 'mt5', leverage: 1000 },
    ]);
  });

  it('should return undefined when there is no data', () => {
    (useTradingPlatformAvailableAccounts as jest.Mock).mockReturnValue({ data: undefined, rest: {} });

    const { result } = renderHook(() => useAvailableMT5Accounts());

    expect(result.current.data).toBeUndefined();
  });

  it('should return platform as mt5', () => {
    const mockData = [{ market_type: 'gaming' }, { market_type: 'financial' }];
    (useTradingPlatformAvailableAccounts as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

    const { result } = renderHook(() => useAvailableMT5Accounts());

    expect(result.current.data).toEqual([
      { market_type: 'synthetic', platform: 'mt5', leverage: 500 },
      { market_type: 'financial', platform: 'mt5', leverage: 1000 },
    ]);
  });
});
