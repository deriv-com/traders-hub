import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthData } from '@deriv-com/api-hooks';
import { fireEvent, render, screen } from '@testing-library/react';

import { useRegulationFlags } from '@/hooks';

import CFDHeading from '../CFDHeading';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('@deriv-com/api-hooks', () => ({
    useAuthData: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => ({
    ...jest.requireActual('@deriv-com/ui'),
    useDevice: jest.fn().mockReturnValue({ isDesktop: true }),
    Text: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Button: ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
        <button onClick={onClick}>{children}</button>
    ),
}));

jest.mock('@/hooks', () => ({
    useRegulationFlags: jest.fn(),
}));

describe('CFDHeading', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Text and CompareAccountsButton', () => {
        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        render(<CFDHeading />);

        expect(screen.getByText(/CFDs/i)).toBeInTheDocument();
        expect(screen.getByText(/Compare Accounts/i)).toBeInTheDocument();
    });

    it('should not render the CompareAccountsButton when isAuthorized is false', () => {
        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: false,
        });

        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        render(<CFDHeading />);

        expect(screen.queryByText(/Compare Accounts/i)).not.toBeInTheDocument();
    });

    it('should render the CompareAccountsButton when isAuthorized is true', () => {
        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        render(<CFDHeading />);

        expect(screen.getByText(/Compare Accounts/i)).toBeInTheDocument();
    });

    it('should render account information instead if isEU is true', () => {
        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: true,
            },
        });

        render(<CFDHeading />);

        expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
    });

    it('should call navigate with correct path when button is clicked', () => {
        (useAuthData as jest.Mock).mockReturnValue({
            isAuthorized: true,
        });

        (useRegulationFlags as jest.Mock).mockReturnValue({
            regulationFlags: {
                isSuccess: true,
                isEU: false,
            },
        });

        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        render(<CFDHeading />);

        const button = screen.getByText(/Compare Accounts/i);
        fireEvent.click(button);

        expect(navigate).toHaveBeenCalledWith('/traders-hub/compare-accounts');
    });
});
