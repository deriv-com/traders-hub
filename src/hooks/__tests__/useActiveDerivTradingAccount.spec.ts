import { renderHook } from '@testing-library/react';

import { useActiveDerivTradingAccount } from '../useActiveDerivTradingAccount';
import { useDerivTradingAccountsList } from '..';

jest.mock('..', () => ({
    useDerivTradingAccountsList: jest.fn(),
}));

describe('useActiveDerivTradingAccount hook', () => {
    it('should return active trading account and rest of the props', async () => {
        const mockData = [
            { loginid: 'CR123456', isActive: true },
            { loginid: 'CR789012', isActive: false },
        ];
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

        const { result } = renderHook(() => useActiveDerivTradingAccount());

        expect(result.current.data).toEqual({ loginid: 'CR123456', isActive: true });
    });

    it('should return undefined if no active trading account found', async () => {
        const mockData = [
            { loginid: 'CR123456 ', isActive: false },
            { loginid: 'CR789012', isActive: false },
        ];
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

        const { result } = renderHook(() => useActiveDerivTradingAccount());

        expect(result.current.data).toBeUndefined();
    });
});
