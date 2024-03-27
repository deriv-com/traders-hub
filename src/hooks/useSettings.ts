import { useMemo } from 'react';

import { useGetSettings } from '@deriv-com/api-hooks';

export const useSettings = () => {
    const { data, ...rest } = useGetSettings();

    const modifiedSettings = useMemo(() => ({ ...data }), [data]);

    return {
        data: modifiedSettings,
        ...rest,
    };
};
