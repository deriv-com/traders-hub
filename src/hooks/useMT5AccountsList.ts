import { useMemo } from 'react';

import { useMt5LoginList } from '@deriv-com/api-hooks';

/** A custom hook that gets the list of created MT5 accounts of the user. */
export const useMT5AccountsList = () => {
    const { data, ...rest } = useMt5LoginList();

    const modifiedAccounts = useMemo(() => {
        return data?.map(account => {
            return {
                ...account,
                /** The formatted display login of the account */
                display_login: account.login?.replace(/^(MT[DR]?)/, ''),
                /** The platform of the account */
                platform: 'mt5' as const,
                /** indicating whether the account is a virtual-money account. */
                is_virtual: account.account_type === 'demo',
                /** The id of the account */
                loginid: account.login,
            };
        });
    }, [data]);

    return { data: modifiedAccounts, ...rest };
};
