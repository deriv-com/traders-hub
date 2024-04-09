import { ReactNode } from 'react';

import { useAuthData } from '@deriv-com/api-hooks';
import { fireEvent, render, screen } from '@testing-library/react';

import { useActiveDerivTradingAccount, useDerivTradingAccountsList, useQueryParams, useRegulationFlags } from '@/hooks';

import { TradingAccountsList } from '../TradingAccountsList';

jest.mock('@deriv-com/api-hooks', () => ({
    useAuthData: jest.fn(),
}));

jest.mock('@/hooks', () => ({
    useActiveDerivTradingAccount: jest.fn(),
    useDerivTradingAccountsList: jest.fn(),
    useQueryParams: jest.fn(),
    useRegulationFlags: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => ({
    Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

describe('TradingAccountsList', () => {
    it('renders correctly', () => {
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ loginid: 'real', is_virtual: false, broker: 'MF', currency: 'USD', displayBalance: 1000 }],
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { loginid: 'real' } });
        (useAuthData as jest.Mock).mockReturnValue({ switchAccount: jest.fn() });
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: true });
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal: jest.fn() });

        render(<TradingAccountsList />);

        expect(screen.getByText('US Dollar')).toBeInTheDocument();
        expect(screen.getByText('real')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('renders correctly for non-EU accounts', () => {
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ loginid: 'real', is_virtual: false, broker: 'CR', currency: 'USD', displayBalance: 1000 }],
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { loginid: 'real' } });
        (useAuthData as jest.Mock).mockReturnValue({ switchAccount: jest.fn() });
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: false });
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal: jest.fn() });

        render(<TradingAccountsList />);

        expect(screen.getByText('US Dollar')).toBeInTheDocument();
        expect(screen.getByText('real')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('handles account switch on click', () => {
        const switchAccountMock = jest.fn();
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ loginid: 'real', is_virtual: false, broker: 'CR', currency: 'USD', displayBalance: 1000 }],
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { loginid: 'real' } });
        (useAuthData as jest.Mock).mockReturnValue({ switchAccount: switchAccountMock });
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: false });
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal: jest.fn() });

        render(<TradingAccountsList />);

        fireEvent.click(screen.getByText('US Dollar'));

        expect(switchAccountMock).toHaveBeenCalledWith('real');
    });

    it('uses USD as fallback currency', () => {
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [{ loginid: 'real', is_virtual: false, broker: 'CR', displayBalance: 1000 }],
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { loginid: 'real' } });
        (useAuthData as jest.Mock).mockReturnValue({ switchAccount: jest.fn() });
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: false });
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal: jest.fn() });

        render(<TradingAccountsList />);

        expect(screen.getByText('US Dollar')).toBeInTheDocument();
    });
});
