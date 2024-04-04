import { useMemo } from 'react';

import { useLandingCompany } from '.';

/**
 * @returns {boolean} isDIELEnabled
 * description: A custom hook to check if the DIEL landing company is enabled
 */
export const useIsDIELEnabled = () => {
    const { data, ...rest } = useLandingCompany();

    const modifiedData = useMemo(() => {
        if (data) {
            const { financial_company, gaming_company } = data;

            const isDIELEnabled = financial_company?.shortcode === 'maltainvest' && gaming_company?.shortcode === 'svg';

            return isDIELEnabled;
        }
    }, [data]);

    return {
        /**
         * Initially known as LOW_RISK, this is a landing company that is a combination of
         * financial_company: { shortcode: 'maltainvest' }
         * gaming_company: { shortcode: 'svg' }
         */
        data: modifiedData,
        ...rest,
    };
};
