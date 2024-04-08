import { useMemo } from 'react';

import { useTradingPlatformLeverage } from '@deriv-com/api-hooks';

/** A custom hook that gets dynamic leverage values. */
export const useDynamicLeverage = (platform: 'mt5' | 'dxtrade' | 'ctrader') => {
    const { data, ...rest } = useTradingPlatformLeverage({ payload: { platform } });

    // Add additional information to the dynamic leverage response.
    const modified_data = useMemo(() => {
        if (!data?.leverage) return;

        return { ...data?.leverage };
    }, [data]);

    return {
        data: modified_data,
        ...rest,
    };
};
