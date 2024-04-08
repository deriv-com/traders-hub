import { render, screen } from '@testing-library/react';

import { useRegulationFlags } from '@/hooks';

import CFDSection from '../CFDSection';

jest.mock('@/hooks', () => ({
    useRegulationFlags: jest.fn(),
}));

jest.mock('../../GetADerivAccountBanner/', () => ({
    GetADerivAccountBanner: () => <div>some text from GetADerivAccountBanner</div>,
}));

jest.mock('../CFDContent', () => ({
    CFDContent: () => <div>some text from CFDContent</div>,
}));

jest.mock('../CFDHeading', () => ({
    CFDHeading: () => <div>some text from CFDHeading</div>,
}));

describe('CFDSection', () => {
    it('renders the CFDHeading and CFDContent', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isSuccess: true,
            noRealCRNonEUAccount: false,
            noRealMFEUAccount: false,
        });

        render(<CFDSection />);

        expect(screen.getByText(/some text from CFDHeading/i)).toBeInTheDocument();
        expect(screen.getByText(/some text from CFDContent/i)).toBeInTheDocument();
    });

    it('renders the GetADerivAccountBanner when conditions are met', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isSuccess: true,
            noRealCRNonEUAccount: true,
            noRealMFEUAccount: false,
        });

        render(<CFDSection />);

        expect(screen.getByText(/some text from GetADerivAccountBanner/i)).toBeInTheDocument();
    });

    it('does not render the GetADerivAccountBanner when conditions are not met', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isSuccess: true,
            noRealCRNonEUAccount: false,
            noRealMFEUAccount: false,
        });

        render(<CFDSection />);

        expect(screen.queryByText(/some text from GetADerivAccountBanner/i)).not.toBeInTheDocument();
    });
});
