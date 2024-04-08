import { ReactNode } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { useQueryParams } from '@/hooks';
import { useRealAccountCreationContext } from '@/providers';

import { ExitConfirmationDialog } from '../ExitConfirmationDialog';

jest.mock('@/hooks', () => ({
    useQueryParams: jest.fn(),
}));
jest.mock('@/providers', () => ({
    useRealAccountCreationContext: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => {
    const Modal = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Modal.displayName = 'Modal';

    const Text = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Text.displayName = 'Text';

    const Button = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
        <button onClick={onClick}>{children}</button>
    );
    Button.displayName = 'Button';

    return { Modal, Text, Button };
});

describe('ExitConfirmationDialog', () => {
    it('renders correctly', () => {
        (useRealAccountCreationContext as jest.Mock).mockReturnValue({
            reset: jest.fn(),
        });
        (useQueryParams as jest.Mock).mockReturnValue({
            closeModal: jest.fn(),
        });

        render(<ExitConfirmationDialog isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByText('Stop creating an account?')).toBeInTheDocument();
        expect(screen.getByText('If you hit Yes, the info you entered will be lost.')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    it('calls onClose, closeModal, and reset when the Yes button is clicked', () => {
        const onClose = jest.fn();
        const closeModal = jest.fn();
        const reset = jest.fn();
        (useRealAccountCreationContext as jest.Mock).mockReturnValue({ reset });
        (useQueryParams as jest.Mock).mockReturnValue({ closeModal });

        render(<ExitConfirmationDialog isOpen={true} onClose={onClose} />);

        fireEvent.click(screen.getByText('Yes'));

        expect(onClose).toHaveBeenCalled();
        expect(closeModal).toHaveBeenCalled();
        expect(reset).toHaveBeenCalled();
    });
});
