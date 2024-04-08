import { render, screen } from '@testing-library/react';

import { Modals } from '../Modals';

jest.mock('@/cfd/modals/MT5PasswordModal', () => {
    const MT5PasswordModal = () => <div>MT5PasswordModal</div>;
    MT5PasswordModal.displayName = 'MT5PasswordModal';
    return { MT5PasswordModal };
});

jest.mock('@/cfd/modals/MT5SuccessModal', () => {
    const MT5SuccessModal = () => <div>MT5SuccessModal</div>;
    MT5SuccessModal.displayName = 'MT5SuccessModal';
    return { MT5SuccessModal };
});

jest.mock('@/flows/RealAccountCreation', () => {
    const RealAccountCreation = () => <div>RealAccountCreation</div>;
    RealAccountCreation.displayName = 'RealAccountCreation';
    return { RealAccountCreation };
});

jest.mock('../RegulationModal', () => {
    const RegulationModal = () => <div>RegulationModal</div>;
    RegulationModal.displayName = 'RegulationModal';
    return { RegulationModal };
});

jest.mock('../AccountOpeningSuccessModal', () => {
    const AccountOpeningSuccessModal = () => <div>AccountOpeningSuccessModal</div>;
    AccountOpeningSuccessModal.displayName = 'AccountOpeningSuccessModal';
    return { AccountOpeningSuccessModal };
});

jest.mock('../AccountSelector', () => {
    const AccountSelector = () => <div>AccountSelector</div>;
    AccountSelector.displayName = 'AccountSelector';
    return { AccountSelector };
});

describe('Modals', () => {
    it('should render all modals', () => {
        render(<Modals />);
        expect(screen.getByText('AccountSelector')).toBeInTheDocument();
        expect(screen.getByText('RealAccountCreation')).toBeInTheDocument();
        expect(screen.getByText('AccountOpeningSuccessModal')).toBeInTheDocument();
        expect(screen.getByText('MT5PasswordModal')).toBeInTheDocument();
        expect(screen.getByText('MT5SuccessModal')).toBeInTheDocument();
        expect(screen.getByText('RegulationModal')).toBeInTheDocument();
    });
});
