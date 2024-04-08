import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { useQueryParams } from '@/hooks';

import RegulationModal from '../RegulationModal';

jest.mock('@/hooks', () => ({
    useQueryParams: jest.fn(),
}));

jest.mock('@/components', () => {
    const RegulationTableContent = () => <div>RegulationTableContent</div>;
    return { RegulationTableContent };
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

    const Text = ({ children }: { children: ReactNode }) => <div>{children}</div>;
    Text.displayName = 'Text';

    return { Modal, Text };
});

describe('RegulationModal', () => {
    it('renders the modal when isModalOpen returns true', () => {
        (useQueryParams as jest.Mock).mockReturnValue({
            isModalOpen: () => true,
            closeModal: jest.fn(),
        });

        render(<RegulationModal />);

        expect(screen.getByText('Non-EU and EU regulations')).toBeInTheDocument();
    });

    it('should show proper content when modal is open', () => {
        (useQueryParams as jest.Mock).mockReturnValue({
            isModalOpen: () => true,
            closeModal: jest.fn(),
        });

        render(<RegulationModal />);

        expect(screen.getByText('Non-EU and EU regulations')).toBeInTheDocument();
        expect(screen.getByText('RegulationTableContent')).toBeInTheDocument();
    });
});
