import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { useActiveDerivTradingAccount, useTotalAssets } from '@/hooks';

import TotalAssets from '../TotalAssets';

jest.mock('@/hooks', () => ({
    useActiveDerivTradingAccount: jest.fn(),
    useTotalAssets: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => ({
    Text: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    useDevice: jest.fn(() => ({
        isDesktop: true,
        isMobile: false,
        isTablet: false,
    })),
}));

describe('TotalAssets', () => {
    it('renders total assets', () => {
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: { is_virtual: false },
        });
        (useTotalAssets as jest.Mock).mockReturnValue({
            formattedTotalBalance: '1000',
        });

        render(<TotalAssets />);

        expect(screen.getByText('Total assets')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });
});
