import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthData, useNewAccountVirtual } from '@deriv-com/api-hooks';

import { useQueryParams } from './useQueryParams';

/**
 * @name useNewVirtualAccount
 * @description A custom hook that creates a new real virtual account.
 * @returns {Object} Submit handler function, the new virtual account data and the status of the request.
 */
export const useNewVirtualAccount = () => {
    const navigate = useNavigate();
    const { openModal } = useQueryParams();
    const {
        data: newTradingAccountData,
        mutate: createAccount,
        status,
        ...rest
    } = useNewAccountVirtual({
        bypassAuth: true,
        onSuccess: () => {
            navigate('/');
            openModal('RealAccountCreation');
        },
    });

    const { appendAccountCookie } = useAuthData();

    const verificationCode = localStorage.getItem('verification_code');

    useEffect(() => {
        if (status === 'success') {
            // fail-safe for typescript as the data type is also undefined
            if (!newTradingAccountData) return;

            appendAccountCookie(newTradingAccountData.client_id, newTradingAccountData.oauth_token);
        }
        // trigger validation error on status change when validation modal is created
    }, [appendAccountCookie, newTradingAccountData, status]);

    /**
     * @name handleSubmit
     * @description A function that handles the form submission and calls the mutation.
     */
    const mutate = useCallback(
        values => {
            createAccount({
                client_password: values.password,
                residence: values.country,
                verification_code: verificationCode ?? '',
            });
        },
        [createAccount, verificationCode]
    );

    return {
        mutate,
        data: newTradingAccountData,
        status,
        ...rest,
    };
};
