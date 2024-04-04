import { useMemo } from 'react';

import { useLandingCompany as useAPIHooksLandingCompany } from '@deriv-com/api-hooks';

import { useSettings } from '.';

export const useLandingCompany = () => {
  const { data: getSettings } = useSettings();

  const { data, ...rest } = useAPIHooksLandingCompany({
    payload: { landing_company: getSettings.country_code ?? '' },
  });

  const modifiedLandingCompany = useMemo(() => ({ ...data }), [data]);

  return {
    data: modifiedLandingCompany,
    ...rest,
  };
};
