import { act, renderHook } from '@testing-library/react';

import { useDxtradeAccountHandler } from '../useDxtradeAccountHandler';
import { useAccountStatus, useActiveDerivTradingAccount, useCreateOtherCFDAccount } from '..';

jest.mock('..', () => ({
  useActiveDerivTradingAccount: jest.fn(),
  useAccountStatus: jest.fn(),
  useCreateOtherCFDAccount: jest.fn(),
}));
jest.mock('@deriv-com/ui', () => ({
  useIsMounted: jest.fn().mockReturnValue(true),
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

describe('useDxtradeAccountHandler', () => {
  it('should call handleSubmit with correct parameters', () => {
    const mockCreateDxtradeAccount = jest.fn();
    (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { is_virtual: false } });
    (useAccountStatus as jest.Mock).mockReturnValue({ data: { is_dxtrade_password_not_set: false } });
    (useCreateOtherCFDAccount as jest.Mock).mockReturnValue({
      mutate: mockCreateDxtradeAccount,
    });

    const { result } = renderHook(() => useDxtradeAccountHandler());
    act(() => {
      result.current.handleSubmit('password123');
    });

    expect(mockCreateDxtradeAccount).toHaveBeenCalledWith({
      account_type: 'real',
      market_type: 'all',
      password: 'password123',
      platform: 'dxtrade',
    });
  });

  it('should call handleSubmit with correct parameters for demo account', () => {
    const mockCreateDxtradeAccount = jest.fn();
    (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { is_virtual: true } });
    (useAccountStatus as jest.Mock).mockReturnValue({ data: { is_dxtrade_password_not_set: false } });
    (useCreateOtherCFDAccount as jest.Mock).mockReturnValue({
      mutate: mockCreateDxtradeAccount,
    });

    const { result } = renderHook(() => useDxtradeAccountHandler());
    act(() => {
      result.current.handleSubmit('password123');
    });

    expect(mockCreateDxtradeAccount).toHaveBeenCalledWith({
      account_type: 'demo',
      market_type: 'all',
      password: 'password123',
      platform: 'dxtrade',
    });
  });
});
