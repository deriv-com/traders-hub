import { useAuthData } from '@deriv-com/api-hooks';
import { render, screen } from '@testing-library/react';

import { useRegulationFlags } from '@/hooks';

import { CFDContent } from '../CFDContent';

jest.mock('@deriv-com/api-hooks', () => ({
    useAuthData: jest.fn(),
}));

jest.mock('@/hooks', () => ({
    useRegulationFlags: jest.fn(),
}));

jest.mock('@cfd/components', () => ({
    CTraderList: () => <div data-testid='ctrader-list' />,
    MT5PlatformsList: () => <div data-testid='mt5-platforms-list' />,
    DxtradePlatformList: () => <div data-testid='dxtrade-platform-list' />,
}));

jest.mock('@/components', () => ({
    TradingAppCardLoader: () => <div data-testid='trading-app-card-loader' />,
}));

describe('CFDContent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render MT5PlatformsList', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        render(<CFDContent />);

        expect(screen.getByTestId('mt5-platforms-list')).toBeInTheDocument();
    });

    it('should render CTraderList when isEU is false', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        render(<CFDContent />);

        expect(screen.getByTestId('ctrader-list')).toBeInTheDocument();
    });

    it('should render OtherCFDPlatformsList when isEU is false', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        render(<CFDContent />);

        expect(screen.getByTestId('dxtrade-platform-list')).toBeInTheDocument();
    });

    it('should not render OtherCFDPlatformsList when isEU is true', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: true,
            },
        });

        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        render(<CFDContent />);

        expect(screen.queryByTestId('dxtrade-platform-list')).not.toBeInTheDocument();
    });

    it('should not render CTraderList when isEU is true', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: true,
            },
        });

        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        render(<CFDContent />);

        expect(screen.queryByTestId('ctrader-list')).not.toBeInTheDocument();
    });

    it('should render TradingAppCardLoader when isSuccess is false', () => {
        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: false,
            },
        });

        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        render(<CFDContent />);

        expect(screen.getByTestId('trading-app-card-loader')).toBeInTheDocument();
    });
});
