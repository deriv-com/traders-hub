import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { TradersHubHeader } from '../TradersHubHeader';

jest.mock('@/components', () => ({
    DemoRealSwitcher: () => <div>DemoRealSwitcher</div>,
}));

jest.mock('@deriv-com/ui', () => ({
    Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

describe('TradersHubHeader', () => {
    it('renders title correctly', () => {
        render(<TradersHubHeader />);

        expect(screen.getByText("Trader's Hub")).toBeInTheDocument();
    });

    it('renders DemoRealSwitcher correctly', () => {
        render(<TradersHubHeader />);

        expect(screen.getByText('DemoRealSwitcher')).toBeInTheDocument();
    });
});
