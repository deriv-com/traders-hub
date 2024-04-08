import { ReactNode } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { useQueryParams } from '@/hooks';

import { AccountSelector } from '../AccountSelector';

jest.mock('@/hooks', () => ({
    useQueryParams: jest.fn(),
}));

jest.mock('@/components', () => {
    const TradingAccountsList = () => <div>TradingAccountsList</div>;
    return { TradingAccountsList };
});

jest.mock('@deriv-com/ui', () => {
    const Modal = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Modal.displayName = 'Modal';

    const Header = ({ children, onRequestClose }: { children: ReactNode; onRequestClose: () => void }) => (
        <div>
            {children}
            <button onClick={onRequestClose}>Close</button>
        </div>
    );
    Header.displayName = 'Header';
    Modal.Header = Header;

    const Body = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Body.displayName = 'Body';
    Modal.Body = Body;

    const Footer = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Footer.displayName = 'Footer';
    Modal.Footer = Footer;

    const Text = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Text.displayName = 'Text';

    const Button = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
        <button onClick={onClick}>{children}</button>
    );
    Button.displayName = 'Button';

    return { Modal, Text, Button };
});

describe('AccountSelector', () => {
    it('renders the modal when isModalOpen returns true', () => {
        (useQueryParams as jest.Mock).mockReturnValue({
            isModalOpen: () => true,
            closeModal: jest.fn(),
        });

        render(<AccountSelector />);

        expect(screen.getByText('Select an account')).toBeInTheDocument();
    });

    it('should show proper content when modal is open', () => {
        (useQueryParams as jest.Mock).mockReturnValue({
            isModalOpen: () => true,
            closeModal: jest.fn(),
        });

        render(<AccountSelector />);

        expect(screen.getByText('Select an account')).toBeInTheDocument();
    });

    it('should close the modal when close button is clicked', () => {
        const closeModal = jest.fn();
        (useQueryParams as jest.Mock).mockReturnValue({
            isModalOpen: () => true,
            closeModal,
        });

        render(<AccountSelector />);

        fireEvent.click(screen.getByText('Close'));

        expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should open the AddOrManageAccount modal when the button is clicked', () => {
        const openModal = jest.fn();
        (useQueryParams as jest.Mock).mockReturnValue({
            isModalOpen: () => true,
            openModal,
            closeModal: jest.fn(),
        });

        render(<AccountSelector />);

        fireEvent.click(screen.getByText('Add or manage account'));

        expect(openModal).toHaveBeenCalledWith('AddOrManageAccount');
    });
});
