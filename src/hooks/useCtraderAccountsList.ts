import { useMemo } from 'react';

import { useTradingPlatformAccounts } from '@deriv-com/api-hooks';

export const useCtraderAccountsList = () => {
    const { data, ...rest } = useTradingPlatformAccounts({
        name: 'trading_platform_accounts',
        payload: { platform: 'ctrader' },
    });

    const modifiedAccounts = useMemo(() => {
        if (data) {
            return data.map(
                account =>
                    ({
                        ...account,
                        /** The platform for the account */
                        platform: 'ctrader',
                        /** indicating whether the account is a virtual-money account. */
                        is_virtual: account.account_type === 'demo',
                        /** The login id for the account */
                        loginid: account.account_id,
                    }) as const
            );
        }
    }, [data]);

    return { data: modifiedAccounts, ...rest };
};
