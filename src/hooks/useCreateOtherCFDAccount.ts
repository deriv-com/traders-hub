import { useMemo } from 'react';

import { useTradingPlatformNewAccount } from '@deriv-com/api-hooks';

/** A custom hook that creates a new Other CFD account. */
export const useCreateOtherCFDAccount = () => {
    const { data, ...rest } = useTradingPlatformNewAccount();

    const modifiedData = useMemo(() => {
        if (!data) return undefined;
        return { ...data };
    }, [data]);

    return { data: modifiedData, ...rest };
};
