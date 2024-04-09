import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { useRegulationFlags } from '@/hooks';

import { OptionsAndMultipliersSection } from '../OptionsAndMultipliersSection';

jest.mock('@/hooks', () => ({
    useRegulationFlags: jest.fn(),
    useActiveDerivTradingAccount: jest.fn(),
    useQueryParams: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => ({
    Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

jest.mock('../OptionsAndMultipliersContent', () => ({
    OptionsAndMultipliersContent: () => <div>OptionsAndMultipliersContent</div>,
}));

jest.mock('../OptionsAndMultipliersHeading', () => ({
    OptionsAndMultipliersHeading: () => <div>OptionsAndMultipliersHeading</div>,
}));

jest.mock('../../GetDerivAccount/', () => ({
    GetDerivAccount: () => <div>GetDerivAccount</div>,
}));

describe('OptionsAndMultipliersSection', () => {
    it('renders the OptionsAndMultipliersHeading and OptionsAndMultipliersContent', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isSuccess: true,
            noRealCRNonEUAccount: false,
            noRealMFEUAccount: false,
        });

        render(<OptionsAndMultipliersSection />);

        expect(screen.getByText('OptionsAndMultipliersHeading')).toBeInTheDocument();
        expect(screen.getByText('OptionsAndMultipliersContent')).toBeInTheDocument();
    });

    it('renders the GetDerivAccount when noRealCRNonEUAccount or noRealMFEUAccount is true and isSuccess is true', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isSuccess: true,
            noRealCRNonEUAccount: true,
            noRealMFEUAccount: false,
        });

        render(<OptionsAndMultipliersSection />);

        expect(screen.getByText('GetDerivAccount')).toBeInTheDocument();
    });

    it('does not render the GetDerivAccount when isSuccess is false', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isSuccess: false,
            noRealCRNonEUAccount: true,
            noRealMFEUAccount: false,
        });

        render(<OptionsAndMultipliersSection />);

        expect(screen.queryByText('GetDerivAccount')).not.toBeInTheDocument();
    });
});
