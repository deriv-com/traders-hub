import { useCallback, useEffect } from 'react';

import { useAuthData, useNewAccountVirtual } from '@deriv-com/api-hooks';

/**
 * @name useNewVirtualAccount
 * @description A custom hook that creates a new real virtual account.
 * @returns {Object} Submit handler function, the new virtual account data and the status of the request.
 */
export const useNewVirtualAccount = () => {
    const { data: newTradingAccountData, mutate: createAccount, status, ...rest } = useNewAccountVirtual();

    const { appendAccountCookie } = useAuthData();

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
    const mutate = useCallback(() => {
        createAccount({
            client_password: 'test',
            residence: 'af',
            verification_code: '123123123',
        });
    }, [createAccount]);

    return {
        mutate,
        data: newTradingAccountData,
        status,
        ...rest,
    };
};
