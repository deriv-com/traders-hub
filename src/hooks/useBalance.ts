import { useMemo } from 'react';

import { useBalance as useAPIBalance } from '@deriv-com/api-hooks';

export const useBalance = () => {
  const { data, ...rest } = useAPIBalance({
    payload: { account: 'all' },
  });

  const modifiedBalance = useMemo(() => ({ ...data }), [data]);

  return { data: modifiedBalance, ...rest };
};
