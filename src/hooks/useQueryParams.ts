import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type ModalId =
    | 'AccountSelector'
    | 'AddOrManageAccount'
    | 'ChangePassword'
    | 'CTraderSuccessModal'
    | 'DummyComponentModal'
    | 'DxtradePasswordModal'
    | 'GetADerivAccountDialog'
    | 'JurisdictionModal'
    | 'MT5AccountTypeModal'
    | 'MT5ChangePasswordModal'
    | 'MT5PasswordModal'
    | 'MT5SuccessModal'
    | 'RealAccountCreation'
    | 'RegulationModal'
    | 'SentEmailContentModal'
    | 'Signup'
    | 'TopUpModal'
    | 'TradeModal'
    | 'VerificationFailedModal';
/**
 * @description A hook to manage query params for modals
 * @returns isOpen: (modalId: ModalId) => boolean
 * @returns openModal: (modalId: string) => void
 * @returns closeModal: () => void
 * @returns queryParams: URLSearchParams
 * @example
 * const { isOpen, openModal, closeModal, queryParams } = useQueryParams();
 * const isModalOpen = isOpen('GetADerivAccountDialog');
 * openModal('GetADerivAccountDialog');
 * closeModal();
 */
export const useQueryParams = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    const isModalOpen = useCallback((modalId: ModalId) => queryParams.get('modal') === modalId, [queryParams]);

    const openModal = useCallback(
        (modalId: string) => {
            queryParams.set('modal', modalId);
            navigate(`${location.pathname}?${queryParams.toString()}`, {
                state: { modal: modalId },
            });
        },
        [queryParams, navigate]
    );

    const closeModal = useCallback(() => {
        queryParams.delete('modal');
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }, [queryParams, navigate]);

    useEffect(() => {
        const handleLoad = () => {
            Array.from(queryParams.keys()).forEach(key => queryParams.delete(key));
            navigate(`${location.pathname}`);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, [queryParams, navigate]);

    return {
        isModalOpen,
        openModal,
        closeModal,
        queryParams,
    };
};
