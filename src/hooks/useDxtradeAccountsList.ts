import { useMemo } from 'react';

import { useTradingPlatformAccounts } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';

export const useDxtradeAccountsList = () => {
    const { data, ...rest } = useTradingPlatformAccounts({
        name: 'trading_platform_accounts',
        payload: { platform: 'dxtrade' },
    });

    const { formatMoney } = FormatUtils;

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
                        /** The balance of the account in currency format. */
                        display_balance: `${formatMoney(account.balance ?? 0, {
                            currency: account.currency as CurrencyConstants.Currency,
                        })} ${account.currency}`,
                    }) as const
            );
        }
    }, [data, formatMoney]);

    return { data: modifiedAccounts, ...rest };
};
