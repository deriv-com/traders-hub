import { useLocation, useNavigate } from 'react-router-dom';

import { renderHook, waitFor } from '@testing-library/react';

import useQueryParams from '../useQueryParams';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('useQueryParams', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useLocation as jest.Mock).mockReturnValue({ search: '' });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it('should open the modal when openModal is called', async () => {
        const { result } = renderHook(() => useQueryParams());

        expect(result.current.isModalOpen('GetADerivAccountDialog')).toBe(false);

        result.current.openModal('GetADerivAccountDialog');

        await waitFor(() => expect(result.current.isModalOpen('GetADerivAccountDialog')).toBe(true));
    });

    it('should close the modal when closeModal is called', async () => {
        const { result } = renderHook(() => useQueryParams());

        result.current.openModal('GetADerivAccountDialog');

        result.current.closeModal();

        await waitFor(() => expect(result.current.isModalOpen('GetADerivAccountDialog')).toBe(false));
    });

    it('should not open the modal for an invalid modal id', async () => {
        const { result } = renderHook(() => useQueryParams());

        result.current.openModal('InvalidModalId');

        await waitFor(() => expect(result.current.isModalOpen('GetADerivAccountDialog')).toBe(false));
    });

    it('should update the URL parameters when openModal is called', async () => {
        const { result } = renderHook(() => useQueryParams());

        result.current.openModal('GetADerivAccountDialog');

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/?modal=GetADerivAccountDialog', {
                state: { modal: 'GetADerivAccountDialog' },
            })
        );
    });

    it('should close the modal when history action is POP', async () => {
        (useNavigate as jest.Mock).mockReturnValue({
            action: 'POP',
            push: mockNavigate,
            location: { pathname: '/' },
        });

        const { result } = renderHook(() => useQueryParams());

        await waitFor(() => expect(result.current.isModalOpen('GetADerivAccountDialog')).toBe(false));
    });

    it('should open the latest modal when openModal is called multiple times', async () => {
        const { result } = renderHook(() => useQueryParams());

        result.current.openModal('GetADerivAccountDialog');
        result.current.openModal('AddOrManageAccount');

        await waitFor(() => expect(result.current.isModalOpen('AddOrManageAccount')).toBe(true));
        await waitFor(() => expect(result.current.isModalOpen('GetADerivAccountDialog')).toBe(false));

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/?modal=AddOrManageAccount', {
                state: { modal: 'AddOrManageAccount' },
            })
        );
    });
});
