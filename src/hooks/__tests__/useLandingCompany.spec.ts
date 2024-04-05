import { useLandingCompany as useAPIHooksLandingCompany } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useLandingCompany } from '../useLandingCompany';
import { useSettings } from '../useSettings';

jest.mock('../useSettings', () => ({
    useSettings: jest.fn(),
    useLandingCompany: jest.fn(),
}));

jest.mock('@deriv-com/api-hooks', () => ({
    ...jest.requireActual('@deriv-com/api-hooks'),
    useLandingCompany: jest.fn(),
}));

describe('useLandingCompany', () => {
    it('should return the correct data', () => {
        const mockSettings = { data: { country_code: 'US' } };
        const mockLandingCompany = { data: { name: 'Test Company' }, rest: {} };

        (useSettings as jest.Mock).mockReturnValue(mockSettings);
        (useAPIHooksLandingCompany as jest.Mock).mockReturnValue(mockLandingCompany);

        const { result } = renderHook(() => useLandingCompany());

        expect(result.current.data).toEqual(mockLandingCompany.data);
        expect(useAPIHooksLandingCompany).toHaveBeenCalledWith({
            payload: { landing_company: mockSettings.data.country_code },
        });
    });
});
