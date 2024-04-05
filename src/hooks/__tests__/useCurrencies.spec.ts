import { useWebsiteStatus } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useCurrencies } from '../useCurrencies';
import { useActiveDerivTradingAccount, useDerivTradingAccountsList, useLandingCompany, useRegulationFlags } from '..';

jest.mock('@deriv-com/api-hooks');
jest.mock('..');

describe('useCurrencies', () => {
    beforeEach(() => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: {} },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: { currency: 'USD' },
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
    });

    it('should return correct data', () => {
        const { result } = renderHook(() => useCurrencies());

        expect(result.current.data).toEqual({ FIAT: [], CRYPTO: [] });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.allCryptoCurrenciesAreAdded).toBe(true);
        expect(result.current.currentAccountCurrencyConfig).toEqual({ id: 'USD' });
        expect(result.current.addedFiatCurrency).toBeUndefined();
    });

    it('should return correct data when loading', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: {} },
            isLoading: true,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: { currency: 'USD' },
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: true,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: true,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });

        const { result } = renderHook(() => useCurrencies());

        expect(result.current.data).toEqual({ FIAT: [], CRYPTO: [] });
        expect(result.current.isLoading).toBe(true);
        expect(result.current.allCryptoCurrenciesAreAdded).toBe(true);
        expect(result.current.currentAccountCurrencyConfig).toEqual({ id: 'USD' });
        expect(result.current.addedFiatCurrency).toBeUndefined();
    });

    it('should return undefined for currentAccountCurrencyConfig when data is undefined', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: {} },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.currentAccountCurrencyConfig).toBeUndefined();
    });

    it('should return undefined for addedFiatCurrency when no fiat currency is added', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: {} },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.addedFiatCurrency).toBeUndefined();
    });

    it('should return empty array if landing company data is undefined', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: { currencies_config: {} },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.data).toEqual({ FIAT: [], CRYPTO: [] });
    });

    it('should return legal allowed currencies for gaming company when isNonEU is true', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: {
                currencies_config: {
                    USD: { type: 'fiat' },
                },
            },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { gaming_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: true,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.data).toEqual({
            FIAT: [
                {
                    id: 'USD',
                    isAdded: false,
                    type: 'fiat',
                },
            ],
            CRYPTO: [],
        });
    });

    it('marks a currency as added if it is in the trading accounts list', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: {
                currencies_config: {
                    USD: { type: 'fiat' },
                },
            },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [
                {
                    currency: 'USD',
                    landing_company_name: 'financial',
                },
            ],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.data).toEqual({
            FIAT: [
                {
                    id: 'USD',
                    isAdded: true,
                    type: 'fiat',
                },
            ],
            CRYPTO: [],
        });
    });

    it('should return if websiteStatusData is undefined', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.data).toBeUndefined();
    });

    it(' should return true for allCryptoCurrenciesAreAdded when all crypto currencies are added', () => {
        (useWebsiteStatus as jest.Mock).mockReturnValue({
            data: {
                currencies_config: {
                    USD: { type: 'fiat' },
                    BTC: { type: 'crypto' },
                },
            },
            isLoading: false,
        });
        (useActiveDerivTradingAccount as jest.Mock).mockReturnValue({
            data: undefined,
        });
        (useDerivTradingAccountsList as jest.Mock).mockReturnValue({
            data: [
                {
                    currency: 'BTC',
                    landing_company_name: 'financial',
                },
            ],
            isLoading: false,
        });
        (useLandingCompany as jest.Mock).mockReturnValue({
            data: { financial_company: { legal_allowed_currencies: ['USD'] } },
            isLoading: false,
        });
        (useRegulationFlags as jest.Mock).mockReturnValue({
            isNonEU: false,
        });
        const { result } = renderHook(() => useCurrencies());
        expect(result.current.allCryptoCurrenciesAreAdded).toBe(true);
    });
});
