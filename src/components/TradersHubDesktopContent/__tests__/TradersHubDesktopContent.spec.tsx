import { render, screen } from '@testing-library/react';

import { useRegulationFlags } from '@/hooks';

import { TradersHubDesktopContent } from '../TradersHubDesktopContent';

jest.mock('@/hooks', () => ({
    useRegulationFlags: jest.fn(),
}));

jest.mock('@/components', () => ({
    CFDSection: () => <div>CFDSection</div>,
    OptionsAndMultipliersSection: () => <div>OptionsAndMultipliersSection</div>,
}));

describe('TradersHubDesktopContent', () => {
    it('renders sections correctly', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: false });

        render(<TradersHubDesktopContent />);

        expect(screen.getByText('OptionsAndMultipliersSection')).toBeInTheDocument();
        expect(screen.getByText('CFDSection')).toBeInTheDocument();
    });

    it('make sure CFD section is rendered first for EU clients', async () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: true });

        render(<TradersHubDesktopContent />);

        expect(screen.getByTestId('traders-hub-desktop-content')).toHaveClass('flex-col-reverse');
    });
});
