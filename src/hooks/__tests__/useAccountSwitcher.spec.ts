import { useAuthData } from '@deriv-com/api-hooks';
import { act, renderHook } from '@testing-library/react';

import { Regulation } from '@/constants';
import { useUIContext } from '@/providers';

import { useAccountSwitcher } from '../useAccountSwitcher';
import {
    useActiveDerivTradingAccount,
    useDerivTradingAccountsList,
    useIsDIELEnabled,
    useQueryParams,
    useRegulationFlags,
} from '..';

jest.mock('@deriv-com/api-hooks', () => ({
    useAuthData: jest.fn(),
}));

jest.mock('@/assets/cfd/ctrader-success.svg?react', () => ({
    __esModule: true,
    default: () => 'CTraderSuccess',
}));

jest.mock('@/assets/cfd/dxtrade-success.svg?react', () => ({
    __esModule: true,
    default: () => 'DerivXSuccess',
}));

jest.mock('@/assets/cfd/mt5-derived-success.svg?react', () => ({
    __esModule: true,
    default: () => 'MT5DerivedSuccess',
}));

jest.mock('@/providers', () => ({
    useUIContext: jest.fn().mockReturnValue({ setUIState: jest.fn(), uiState: {} }),
}));

jest.mock('..', () => ({
    useRegulationFlags: jest.fn(),
    useQueryParams: jest.fn(),
    useAuthData: jest.fn(),
    useDerivTradingAccountsList: jest.fn(),
    useActiveDerivTradingAccount: jest.fn(),
    useIsDIELEnabled: jest.fn(),
}));

jest.mock('@deriv-com/ui', () => ({
    useIsMounted: () => ({
        isMounted: jest.fn(),
    }),
}));

describe('useAccountSwitcher', () => {
    beforeEach(() => {
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { is_virtual: false } });
        (useAuthData as jest.Mock).mockReturnValue({ switchAccount: jest.fn() });
        (useIsDIELEnabled as jest.Mock).mockReturnValue({ data: false });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [
                { is_virtual: false, loginid: 'real1' },
                { is_virtual: true, loginid: 'demo1' },
            ],
        });
        (useQueryParams as jest.Mock).mockReturnValue({ openModal: jest.fn() });
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: false });
        (useUIContext as jest.Mock).mockReturnValue({ setUIState: jest.fn() });
    });

    it('should return the correct initial state', () => {
        const { result } = renderHook(() => useAccountSwitcher());
        expect(result.current.selectedAccount).toEqual({ label: 'Real', value: 'real' });
    });

    it('should switch account when setSelectedAccount is called', () => {
        const { result } = renderHook(() => useAccountSwitcher());
        act(() => {
            result.current.setSelectedAccount({ label: 'Demo', value: 'demo' });
        });
        expect(result.current.selectedAccount).toEqual({ label: 'Demo', value: 'demo' });
    });
    it('should call setUIState with the correct parameters when activeAccountType changes', () => {
        const setUIState = jest.fn();
        (useUIContext as jest.Mock).mockReturnValue({ setUIState });
        const { rerender } = renderHook(() => useAccountSwitcher());
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { is_virtual: true } });
        rerender();
        expect(setUIState).toHaveBeenCalledWith({
            accountType: 'demo',
        });
    });

    it('should call switchAccount with firstRealLoginId when account value is not demo', () => {
        const switchAccount = jest.fn();
        (useAuthData as jest.Mock).mockReturnValue({ switchAccount });
        const { result } = renderHook(() => useAccountSwitcher());
        act(() => {
            result.current.setSelectedAccount({ label: 'Real', value: 'real' });
        });
        expect(switchAccount).toHaveBeenCalledWith('real1');
    });

    it('should set regulation to NonEU when isDIEL is true and activeAccountType is demo', () => {
        const setUIState = jest.fn();
        (useUIContext as jest.Mock).mockReturnValue({ setUIState });
        (useIsDIELEnabled as jest.Mock).mockReturnValue({ data: true });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { is_virtual: true } });
        renderHook(() => useAccountSwitcher());
        expect(setUIState).toHaveBeenCalledWith({
            regulation: Regulation.NonEU,
        });
    });

    it('should open RealAccountCreationModal when activeAccountType is real and isEU is true', () => {
        const openModal = jest.fn();
        (useQueryParams as jest.Mock).mockReturnValue({
            openModal,
        });
        (useUIContext as jest.Mock).mockReturnValue({
            setUIState: jest.fn(),
            uiState: {
                accountType: 'real',
            },
        });
        (useIsDIELEnabled as jest.Mock).mockReturnValue({ data: false });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({ data: { is_virtual: false } });
        (useRegulationFlags as jest.Mock).mockReturnValue({ isEU: true });
        const { result } = renderHook(() => useAccountSwitcher());
        act(() => {
            result.current.setSelectedAccount({ label: 'Real', value: 'real' });
        });
        expect(openModal).toHaveBeenCalledWith('RealAccountCreation');
    });
});
