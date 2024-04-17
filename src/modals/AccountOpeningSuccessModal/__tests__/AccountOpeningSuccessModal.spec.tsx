import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { useQueryParams } from '@/hooks';
import { useRealAccountCreationContext } from '@/providers';

import { AccountOpeningSuccessModal } from '../AccountOpeningSuccessModal';

jest.mock('@/providers', () => ({
    useRealAccountCreationContext: jest.fn(),
}));
jest.mock('@/hooks', () => ({
    useQueryParams: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => ({
    ...jest.requireActual('@deriv-com/ui'),
    Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Text: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Button: ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
        <button onClick={onClick}>{children}</button>
    ),
    useDevice: () => ({ isDesktop: true }),
}));

describe('AccountOpeningSuccessModal', () => {
    it('renders correctly', () => {
        (useRealAccountCreationContext as jest.Mock).mockReturnValue({
            isSuccessModalOpen: true,
            reset: jest.fn(),
            state: { currency: 'USD' },
        });
        (useQueryParams as jest.Mock).mockReturnValue({
            closeModal: jest.fn(),
        });

        render(<AccountOpeningSuccessModal />);

        expect(screen.getByText('Your account is ready')).toBeInTheDocument();
        expect(screen.getByText('You have added a USD account.')).toBeInTheDocument();
        expect(screen.getByText('Make a deposit now to start trading.')).toBeInTheDocument();
        expect(screen.getByText('Maybe later')).toBeInTheDocument();
        expect(screen.getByText('Deposit')).toBeInTheDocument();
    });

    it('calls reset, closeModal, and navigate when the Deposit button is clicked', () => {
        const reset = jest.fn();
        const closeModal = jest.fn();
        const navigate = jest.fn();
        (useRealAccountCreationContext as jest.Mock).mockReturnValue({
            isSuccessModalOpen: true,
            reset,
            state: { currency: 'USD' },
        });
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal });
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        render(<AccountOpeningSuccessModal />);

        fireEvent.click(screen.getByText('Deposit'));

        expect(reset).toHaveBeenCalled();
        expect(closeModal).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith('https://app.deriv.com/cashier/deposit');
    });

    it('uses USD as the default currency if state.currency is undefined', () => {
        const mockContext = {
            isSuccessModalOpen: true,
            reset: jest.fn(),
            state: { currency: undefined }, // state.currency is undefined
        };
        (useRealAccountCreationContext as jest.Mock).mockReturnValue(mockContext);
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal: jest.fn() });
        (useNavigate as jest.Mock).mockReturnValue(jest.fn());

        render(<AccountOpeningSuccessModal />);

        // Check if the useRealAccountCreationContext hook was called and returned the correct state
        expect(useRealAccountCreationContext).toHaveBeenCalled();
        expect(mockContext.state.currency).toBeUndefined();
    });
});
