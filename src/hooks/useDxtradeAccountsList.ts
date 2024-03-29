import { useMemo } from 'react';

import { useTradingPlatformAccounts } from '@deriv-com/api-hooks';

export const useDxtradeAccountsList = () => {
    const { data, ...rest } = useTradingPlatformAccounts({
        name: 'trading_platform_accounts',
        payload: { platform: 'dxtrade' },
    });

    const modifiedAccounts = useMemo(() => {
        if (data) {
            return data.map(
                account =>
                    ({
                        ...account,
                        /** The platform for the account */
                        platform: 'dxtrade',
                        /** indicating whether the account is a virtual-money account. */
                        is_virtual: account.account_type === 'demo',
                    }) as const
            );
        }
    }, [data]);

    return { data: modifiedAccounts, ...rest };
};
