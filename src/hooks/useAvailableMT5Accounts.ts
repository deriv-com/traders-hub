import { useMemo } from 'react';

import { useTradingPlatformAvailableAccounts } from '@deriv-com/api-hooks';

const market_type_to_leverage_mapper: Record<string, number> = {
    gaming: 500,
    financial: 1000,
    all: 100,
} as const;

export const useAvailableMT5Accounts = () => {
    const { data, ...rest } = useTradingPlatformAvailableAccounts({
        payload: { platform: 'mt5' },
    });

    const modifiedAccounts = useMemo(() => {
        if (data) {
            return data.map(
                account =>
                    ({
                        ...account,
                        /** The market type for the account */
                        market_type: account.market_type === 'gaming' ? 'synthetic' : account.market_type,
                        /** The platform for the account */
                        platform: 'mt5',
                        /** Leverage for the account */
                        leverage:
                            market_type_to_leverage_mapper[
                                account.market_type as keyof typeof market_type_to_leverage_mapper
                            ],
                    }) as const
            );
        }
    }, [data]);

    return { data: modifiedAccounts, ...rest };
};
