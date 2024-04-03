import { useTradingPlatformNewAccount } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useCreateOtherCFDAccount } from '../useCreateOtherCFDAccount';

jest.mock('@deriv-com/api-hooks', () => ({
    useTradingPlatformNewAccount: jest.fn(),
}));

describe('useCreateOtherCFDAccount hook', () => {
    it('should return modified data with correct properties', () => {
        const mockData = { account: 'CFD' };
        (useTradingPlatformNewAccount as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

        const { result } = renderHook(() => useCreateOtherCFDAccount());

        expect(result.current.data).toEqual(mockData);
    });

    it('should return undefined when there is no data', () => {
        (useTradingPlatformNewAccount as jest.Mock).mockReturnValue({ data: undefined, rest: {} });

        const { result } = renderHook(() => useCreateOtherCFDAccount());

        expect(result.current.data).toBeUndefined();
    });

    it('should throw an error when useTradingPlatformNewAccount throws an error', () => {
        (useTradingPlatformNewAccount as jest.Mock).mockReturnValue({ error: Error('API error') });

        const { result } = renderHook(() => useCreateOtherCFDAccount());

        expect(result.current.error).toEqual(Error('API error'));
    });

    it('should return isPending as true when useTradingPlatformNewAccount is pending', () => {
        (useTradingPlatformNewAccount as jest.Mock).mockReturnValue({ isPending: true });

        const { result } = renderHook(() => useCreateOtherCFDAccount());

        expect(result.current.isPending).toBeTruthy();
    });

    it('should return isSuccess as true when useTradingPlatformNewAccount is successful', () => {
        (useTradingPlatformNewAccount as jest.Mock).mockReturnValue({ isSuccess: true });

        const { result } = renderHook(() => useCreateOtherCFDAccount());

        expect(result.current.isSuccess).toBeTruthy();
    });
});
