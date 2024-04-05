import { useAuthData, useNewAccountReal } from '@deriv-com/api-hooks';
import { act, renderHook } from '@testing-library/react';

import { useRealAccountCreationContext } from '@/providers';

import { useNewCRRealAccount } from '../useNewCRRealAccount';
import { useSettings, useSyncLocalStorageClientAccounts } from '..';

jest.mock('@deriv-com/api-hooks', () => ({
    useRealAccountCreationContext: jest.fn(),
    useNewAccountReal: jest.fn(),
    useAuthData: jest.fn(),
}));

jest.mock('@/providers', () => ({
    useRealAccountCreationContext: jest.fn(),
}));

jest.mock('../useSettings', () => ({
    useSettings: jest.fn(),
}));

jest.mock('../useSyncLocalStorageClientAccounts', () => ({
    useSyncLocalStorageClientAccounts: jest.fn(),
}));

describe('useNewCRRealAccount', () => {
    it('should call the correct functions when status is success', async () => {
        const mockSetIsWizardOpen = jest.fn();
        const mockSetIsSuccessModalOpen = jest.fn();
        const mockAddTradingAccountToLocalStorage = jest.fn();
        const mockSwitchAccount = jest.fn();
        const mockCreateAccount = jest.fn();

        (useRealAccountCreationContext as jest.Mock).mockReturnValue({
            setIsWizardOpen: mockSetIsWizardOpen,
            setIsSuccessModalOpen: mockSetIsSuccessModalOpen,
        });
        (useNewAccountReal as jest.Mock).mockReturnValue({
            data: { client_id: '123' },
            status: 'success',
            mutate: mockCreateAccount,
        });
        (useSyncLocalStorageClientAccounts as jest.Mock).mockReturnValue({
            addTradingAccountToLocalStorage: mockAddTradingAccountToLocalStorage,
        });
        (useAuthData as jest.Mock).mockReturnValue({
            switchAccount: mockSwitchAccount,
        });

        (useSettings as jest.Mock).mockReturnValue({
            data: { country_code: 'US' },
        });

        const { result } = renderHook(() => useNewCRRealAccount());

        await act(() => {
            result.current.mutate();
        });

        expect(mockAddTradingAccountToLocalStorage).toHaveBeenCalledWith({ client_id: '123' });
        expect(mockSwitchAccount).toHaveBeenCalledWith('123');
    });

    it('should not call any function if newTradingAccountData is undefined', async () => {
        const mockSetIsWizardOpen = jest.fn();
        const mockSetIsSuccessModalOpen = jest.fn();
        const mockAddTradingAccountToLocalStorage = jest.fn();
        const mockSwitchAccount = jest.fn();
        const mockCreateAccount = jest.fn();

        (useRealAccountCreationContext as jest.Mock).mockReturnValue({
            setIsWizardOpen: mockSetIsWizardOpen,
            setIsSuccessModalOpen: mockSetIsSuccessModalOpen,
        });
        (useNewAccountReal as jest.Mock).mockReturnValue({
            data: undefined,
            status: 'success',
            mutate: mockCreateAccount,
        });
        (useSyncLocalStorageClientAccounts as jest.Mock).mockReturnValue({
            addTradingAccountToLocalStorage: mockAddTradingAccountToLocalStorage,
        });
        (useAuthData as jest.Mock).mockReturnValue({
            switchAccount: mockSwitchAccount,
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { country_code: 'US' },
        });

        const { result } = renderHook(() => useNewCRRealAccount());

        await act(() => {
            result.current.mutate();
        });

        expect(mockAddTradingAccountToLocalStorage).not.toHaveBeenCalled();
        expect(mockSwitchAccount).not.toHaveBeenCalled();
        expect(mockSetIsWizardOpen).not.toHaveBeenCalled();
        expect(mockSetIsSuccessModalOpen).not.toHaveBeenCalled();
    });
});
