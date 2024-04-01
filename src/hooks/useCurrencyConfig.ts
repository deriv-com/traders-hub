import { useCallback, useMemo } from 'react';

import { useCryptoConfig, useWebsiteStatus } from '@deriv-com/api-hooks';

/** A custom hook to get the currency config information from `website_status` endpoint and `crypto_config` endpoint. */
export const useCurrencyConfig = () => {
    const { data: websiteStatusData, isLoading: isWebsiteStatusLoading, ...rest } = useWebsiteStatus();
    const { data: cryptoConfigData, isLoading: isCryptConfigLoading } = useCryptoConfig();

    const modifiedCurrencyConfig = useMemo(() => {
        if (!websiteStatusData || !cryptoConfigData) return;

        const websiteStatusCurrenciesConfig = websiteStatusData.currencies_config;

        return Object.keys(websiteStatusCurrenciesConfig).map(currency => {
            const currencyConfig = websiteStatusCurrenciesConfig[currency];

            return {
                ...currencyConfig,
                /** determine if the currency is a `crypto` currency */
                isCrypto: currencyConfig.type === 'crypto',
                /** determine if the currency is a `fiat` currency */
                isFiat: currencyConfig.type === 'fiat',
                /** Currency code */
                code: currency,
                /** Currency display code */
                display_code: currency === 'UST' ? 'USDT' : currency,
            };
        });
    }, [websiteStatusData, cryptoConfigData]);

    // Add additional information to the crypto config.
    const modifiedCryptoConfig = useMemo(() => {
        return modifiedCurrencyConfig?.map(currency => ({
            ...currency,
            ...cryptoConfigData?.currencies_config[currency.code],
        }));
    }, [modifiedCurrencyConfig, cryptoConfigData]);

    // Transform the currency config array into a record object.
    const transformedCurrencyConfig = useMemo(() => {
        return modifiedCryptoConfig?.reduce<Record<string, (typeof modifiedCryptoConfig)[0]>>(
            (previous, current) => ({ ...previous, [current.code]: current }),
            {}
        );
    }, [modifiedCryptoConfig]);

    const getConfig = useCallback(
        (currency: string) => transformedCurrencyConfig?.[currency],
        [transformedCurrencyConfig]
    );

    return {
        data: transformedCurrencyConfig,
        /** Returns the currency config object for the given currency */
        getConfig,
        isLoading: isWebsiteStatusLoading || isCryptConfigLoading,
        ...rest,
    };
};
