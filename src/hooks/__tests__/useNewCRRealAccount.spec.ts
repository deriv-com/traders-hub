import { useAuthData, useNewAccountReal } from '@deriv-com/api-hooks';
import { act, renderHook } from '@testing-library/react';

import { useRealAccountCreationContext } from '@/providers';

import { useNewCRRealAccount } from '../useNewCRRealAccount';
import { useSettings } from '..';

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

describe('useNewCRRealAccount', () => {
    it('should call the correct functions when status is success', async () => {
        const mockSetIsWizardOpen = jest.fn();
        const mockSetIsSuccessModalOpen = jest.fn();
        const mockAddTradingAccount = jest.fn();
        const mockCreateAccount = jest.fn();

        (useRealAccountCreationContext as jest.Mock).mockReturnValue({
            setIsWizardOpen: mockSetIsWizardOpen,
            setIsSuccessModalOpen: mockSetIsSuccessModalOpen,
        });
        (useNewAccountReal as jest.Mock).mockReturnValue({
            data: { client_id: '123', oauth_token: 'oauth_token' },
            status: 'success',
            mutate: mockCreateAccount,
        });

        (useAuthData as jest.Mock).mockReturnValue({
            appendAccountCookie: mockAddTradingAccount,
        });

        (useSettings as jest.Mock).mockReturnValue({
            data: { country_code: 'US' },
        });

        const { result } = renderHook(() => useNewCRRealAccount());

        await act(() => {
            result.current.mutate();
        });

        expect(mockAddTradingAccount).toHaveBeenCalledWith('123', 'oauth_token');
    });

    it('should not call any function if newTradingAccountData is undefined', async () => {
        const mockSetIsWizardOpen = jest.fn();
        const mockSetIsSuccessModalOpen = jest.fn();
        const mockappendAccountCookie = jest.fn();
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

        (useAuthData as jest.Mock).mockReturnValue({
            appendAccountCookie: mockappendAccountCookie,
        });
        (useSettings as jest.Mock).mockReturnValue({
            data: { country_code: 'US' },
        });

        const { result } = renderHook(() => useNewCRRealAccount());

        await act(() => {
            result.current.mutate();
        });

        expect(mockappendAccountCookie).not.toHaveBeenCalled();
        expect(mockSetIsWizardOpen).not.toHaveBeenCalled();
        expect(mockSetIsSuccessModalOpen).not.toHaveBeenCalled();
    });
});
