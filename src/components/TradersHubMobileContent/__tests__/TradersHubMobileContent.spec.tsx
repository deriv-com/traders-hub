import { render, screen } from '@testing-library/react';

import { TradersHubMobileContent } from '../TradersHubMobileContent';

jest.mock('@/components', () => ({
    OptionsAndMultipliersSection: () => <div>OptionsAndMultipliersSection</div>,
    CFDSection: () => <div>CFDSection</div>,
}));

jest.mock('@deriv-com/ui', () => ({
    Tabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Tab: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('TradersHubMobileContent', () => {
    it('renders tabs correctly', () => {
        render(<TradersHubMobileContent />);

        expect(screen.getByText('OptionsAndMultipliersSection')).toBeInTheDocument();
        expect(screen.getByText('CFDSection')).toBeInTheDocument();
    });

    it('renders tab content correctly', () => {
        render(<TradersHubMobileContent />);

        expect(screen.getByText('OptionsAndMultipliersSection')).toBeInTheDocument();
        expect(screen.getByText('CFDSection')).toBeInTheDocument();
    });
});
