import { useBalance as useAPIBalance } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useBalance } from '../useBalance';

jest.mock('@deriv-com/api-hooks', () => ({
    useBalance: jest.fn(),
}));

describe('useBalance hook', () => {
    it('should return modified balance with correct properties', () => {
        const mockData = { balance: 1000 };
        (useAPIBalance as jest.Mock).mockReturnValue({ data: mockData, rest: {} });

        const { result } = renderHook(() => useBalance());

        expect(result.current.data).toEqual(mockData);
    });

    it('should return empty object when there is no data', () => {
        (useAPIBalance as jest.Mock).mockReturnValue({ data: undefined, rest: {} });

        const { result } = renderHook(() => useBalance());

        expect(result.current.data).toEqual({});
    });
    it('should throw an error when useAPIBalance throws an error', () => {
        (useAPIBalance as jest.Mock).mockReturnValue({ error: Error('API error') });

        const { result } = renderHook(() => useBalance());

        expect(result.current.error).toEqual(Error('API error'));
    });
});
