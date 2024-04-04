import { useMemo } from 'react';

import { useMt5LoginList } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';

import { useCurrencyConfig } from '.';

/** A custom hook that gets the list of created MT5 accounts of the user. */
export const useMT5AccountsList = () => {
    const { data, ...rest } = useMt5LoginList();
    const { getConfig } = useCurrencyConfig();

    const { formatMoney } = FormatUtils;

    const modifiedAccounts = useMemo(() => {
        return data?.map(account => {
            return {
                ...account,
                /** Account's currency config information */
                currencyConfig: account.currency ? getConfig(account.currency) : undefined,
                /** The formatted display login of the account */
                display_login: account.login?.replace(/^(MT[DR]?)/, ''),
                /** The platform of the account */
                platform: 'mt5' as const,
                /** indicating whether the account is a virtual-money account. */
                is_virtual: account.account_type === 'demo',
                /** The id of the account */
                loginid: account.login,
                /** The balance of the account in currency format. */
                display_balance: Number(
                    `${formatMoney(account.balance ?? 0, {
                        currency: account.currency as CurrencyConstants.Currency,
                    })} ${account.currency}`
                ),
            } as const;
        });
    }, [data, formatMoney, getConfig]);

    return { data: modifiedAccounts, ...rest };
};
