import { act } from 'react-dom/test-utils';

import { useMT5NewAccount, useTradingPlatformPasswordChange } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { CFDPlatforms, Jurisdiction, MarketType } from '@/cfd';
import { useCFDContext } from '@/providers';

import { useMT5AccountHandler } from '../useMT5AccountHandler';
import { useAccountStatus, useActiveDerivTradingAccount, useAvailableMT5Accounts, useSettings } from '..';

jest.mock('..', () => ({
    useAccountStatus: jest.fn(),
    useActiveDerivTradingAccount: jest.fn(),
    useAvailableMT5Accounts: jest.fn(),
    useSettings: jest.fn(),
}));

jest.mock('@deriv-com/api-hooks', () => ({
    useMT5NewAccount: jest.fn(),
    useTradingPlatformPasswordChange: jest.fn(),
}));

jest.mock('@/providers', () => ({
    useCFDContext: jest.fn(),
}));

describe('useMT5AccountHandler', () => {
    beforeEach(() => {
        (useAccountStatus as jest.Mock).mockReturnValue({ data: {}, status: 'idle' });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            error: null,
            isPending: false,
            isSuccess: false,
            status: 'idle',
            mutateAsync: jest.fn(),
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({ isPending: false, mutateAsync: jest.fn() });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: {} });
        (useAvailableMT5Accounts as jest.Mock).mockReturnValue({ data: [] });
        (useSettings as jest.Mock).mockReturnValue({ data: {} });
        (useCFDContext as jest.Mock).mockReturnValue({ cfdState: {} });
    });

    it('should return the correct initial state', () => {
        const { result } = renderHook(() => useMT5AccountHandler());

        expect(result.current.createMT5AccountLoading).toBe(false);
        expect(result.current.doesNotMeetPasswordPolicy).toBe(false);
        expect(result.current.isCreateMT5AccountError).toBe(null);
        expect(result.current.isCreateMT5AccountSuccess).toBe(false);
        expect(result.current.status).toBe('idle');
        expect(result.current.createMT5AccountStatus).toBe('idle');
        expect(result.current.tradingPlatformPasswordChangeLoading).toBe(false);
    });
    it('should call createMT5Account with account_type "gaming" when marketType is SYNTHETIC', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockTradingPasswordChange = jest.fn();

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.SYNTHETIC,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({
            mutateAsync: mockTradingPasswordChange,
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        await act(() => result.current.handleSubmit('password'));

        expect(mockCreateMT5Account).toHaveBeenCalledWith(
            expect.objectContaining({
                account_type: 'gaming',
            })
        );
    });

    it('should call createMT5Account with categoryAccountType demo when active account is demo', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockTradingPasswordChange = jest.fn();

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.SYNTHETIC,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({
            mutateAsync: mockTradingPasswordChange,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: {
                is_virtual: true,
            },
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        await act(() => result.current.handleSubmit('password'));

        expect(mockCreateMT5Account).toHaveBeenCalledWith(
            expect.objectContaining({
                account_type: 'demo',
            })
        );
    });

    it('should call tradingPasswordChange with correct parameters when handleSubmit is called', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockTradingPasswordChange = jest.fn();

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.SYNTHETIC,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({
            mutateAsync: mockTradingPasswordChange,
        });
        (useAccountStatus as jest.Mock).mockReturnValue({
            data: {
                is_mt5_password_not_set: true,
            },
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        const password = 'password';
        await act(() => result.current.handleSubmit(password));

        expect(mockTradingPasswordChange).toHaveBeenCalledWith({
            new_password: password,
            platform: CFDPlatforms.MT5,
        });
    });

    it('should set leverage to the correct value based on marketType', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockAccounts = [{ market_type: MarketType.SYNTHETIC, leverage: 100 }];

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.SYNTHETIC,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useAvailableMT5Accounts as jest.Mock).mockReturnValue({
            data: mockAccounts,
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        await act(() => result.current.handleSubmit('password'));

        expect(mockCreateMT5Account).toHaveBeenCalledWith(
            expect.objectContaining({
                leverage: 100,
            })
        );
    });

    it('should call createMT5Account with mt5_account_type "financial" when selectedJurisdiction is not LABUAN and marketType is FINANCIAL', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockTradingPasswordChange = jest.fn();

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.FINANCIAL,
                selectedJurisdiction: Jurisdiction.BVI,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({
            mutateAsync: mockTradingPasswordChange,
        });
        (useAccountStatus as jest.Mock).mockReturnValue({
            data: {
                is_mt5_password_not_set: true,
            },
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        await act(() => result.current.handleSubmit('password'));

        expect(mockCreateMT5Account).toHaveBeenCalledWith(
            expect.objectContaining({
                mt5_account_type: MarketType.FINANCIAL,
            })
        );
    });

    it('should call createMT5Account with mt5_account_type "financial" when marketType is FINANCIAL', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockTradingPasswordChange = jest.fn();

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.FINANCIAL,
                selectedJurisdiction: Jurisdiction.BVI,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({
            mutateAsync: mockTradingPasswordChange,
        });
        (useAccountStatus as jest.Mock).mockReturnValue({
            data: {
                is_mt5_password_not_set: true,
            },
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        await act(() => result.current.handleSubmit('password'));

        expect(mockCreateMT5Account).toHaveBeenCalledWith(
            expect.objectContaining({
                mt5_account_type: MarketType.FINANCIAL,
            })
        );
    });

    it('should call createMT5Account with sub_account_category "swap_free" when marketType is ALL', async () => {
        const mockCreateMT5Account = jest.fn();
        const mockTradingPasswordChange = jest.fn();

        (useCFDContext as jest.Mock).mockReturnValue({
            cfdState: {
                marketType: MarketType.ALL,
                selectedJurisdiction: Jurisdiction.BVI,
            },
        });
        (useMT5NewAccount as jest.Mock).mockReturnValue({
            mutateAsync: mockCreateMT5Account,
        });
        (useTradingPlatformPasswordChange as jest.Mock).mockReturnValue({
            mutateAsync: mockTradingPasswordChange,
        });
        (useAccountStatus as jest.Mock).mockReturnValue({
            data: {
                is_mt5_password_not_set: true,
            },
        });

        const { result } = renderHook(() => useMT5AccountHandler());

        await act(() => result.current.handleSubmit('password'));

        expect(mockCreateMT5Account).toHaveBeenCalledWith(
            expect.objectContaining({
                sub_account_category: 'swap_free',
            })
        );
    });
});
