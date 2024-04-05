import { renderHook } from '@testing-library/react';

import { useIsEuRegion } from '../useIsEuRegion';
import { useLandingCompany } from '../useLandingCompany';

jest.mock('../useLandingCompany', () => ({
    useLandingCompany: jest.fn(),
}));

describe('useIsEuRegion', () => {
    it('returns true if the user is in the EU region', () => {
        const mockData = {
            financial_company: { shortcode: 'maltainvest' },
            gaming_company: null,
        };

        (useLandingCompany as jest.Mock).mockReturnValue({
            data: mockData,
        });

        const { result } = renderHook(() => useIsEuRegion());

        expect(result.current).toBe(true);
    });

    it('returns undefined if the data is not available', () => {
        (useLandingCompany as jest.Mock).mockReturnValue({});

        const { result } = renderHook(() => useIsEuRegion());

        expect(result.current).toBeUndefined();
    });

    it('returns false if the user is not in the EU region', () => {
        const mockData = {
            financial_company: { shortcode: 'other' },
            gaming_company: { shortcode: 'other' },
        };

        (useLandingCompany as jest.Mock).mockReturnValue({
            data: mockData,
        });

        const { result } = renderHook(() => useIsEuRegion());

        expect(result.current).toBe(false);
    });
});
