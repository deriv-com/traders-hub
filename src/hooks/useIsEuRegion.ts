import { useMemo } from 'react';

import { useLandingCompany } from './useLandingCompany';

/**
 * @description A custom hook that returns whether the user is in the EU region
 * @returns boolean
 */

export const useIsEuRegion = () => {
    const { data: landingCompany } = useLandingCompany();

    const isEUCountry = useMemo(() => {
        if (!landingCompany) return;

        const { gaming_company, financial_company } = landingCompany;

        const isEURegion = !gaming_company && financial_company?.shortcode === 'maltainvest';

        return isEURegion;
    }, [landingCompany]);

    return isEUCountry;
};
