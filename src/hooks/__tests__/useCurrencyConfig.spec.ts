import { useCryptoConfig, useWebsiteStatus } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useCurrencyConfig } from '../useCurrencyConfig';

jest.mock('@deriv-com/api-hooks', () => ({
    useCryptoConfig: jest.fn(),
    useWebsiteStatus: jest.fn(),
}));

describe('useCurrencyConfig', () => {
    it('returns the expected data structure', async () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: { USD: { type: 'fiat' }, BTC: { type: 'crypto' } } },
            isLoading: false,
        });
        (useCryptoConfig as jest.Mock).mockReturnValue({
            data: { currencies_config: { USD: { min_withdrawal: 20 }, BTC: { min_withdrawal: 0.001 } } },
            isLoading: false,
        });

        const { result } = renderHook(() => useCurrencyConfig());

        expect(result.current.data).toEqual({
            USD: {
                type: 'fiat',
                isCrypto: false,
                isFiat: true,
                code: 'USD',
                display_code: 'USD',
                min_withdrawal: 20,
            },
            BTC: {
                type: 'crypto',
                isCrypto: true,
                isFiat: false,
                code: 'BTC',
                display_code: 'BTC',
                min_withdrawal: 0.001,
            },
        });
        expect(result.current.isLoading).toBe(false);
    });

    it('returns the correct config for a given currency', async () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: { USD: { type: 'fiat' }, BTC: { type: 'crypto' } } },
            isLoading: false,
        });
        (useCryptoConfig as jest.Mock).mockReturnValue({
            data: { currencies_config: { USD: { min_withdrawal: 20 }, BTC: { min_withdrawal: 0.001 } } },
            isLoading: false,
        });

        const { result } = renderHook(() => useCurrencyConfig());

        const config = result.current.getConfig('USD');

        expect(config).toEqual({
            type: 'fiat',
            isCrypto: false,
            isFiat: true,
            code: 'USD',
            display_code: 'USD',
            min_withdrawal: 20,
        });
    });

    it('returns "USDT" as display_code for "UST"', async () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: { UST: { type: 'crypto' } } },
            isLoading: false,
        });
        (useCryptoConfig as jest.Mock).mockReturnValue({
            data: { currencies_config: { UST: { min_withdrawal: 0.001 } } },
            isLoading: false,
        });

        const { result } = renderHook(() => useCurrencyConfig());

        const config = result.current.getConfig('UST');

        expect(config?.display_code).toEqual('USDT');
    });

    it('should return undefined if there are no data', async () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
        });
        (useCryptoConfig as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
        });

        const { result } = renderHook(() => useCurrencyConfig());

        expect(result.current.data).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
    });
});
