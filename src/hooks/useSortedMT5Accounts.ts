import { useMemo } from 'react';

import { useUIContext } from '@/providers';

import { useActiveDerivTradingAccount, useAvailableMT5Accounts, useIsEuRegion, useMT5AccountsList } from '.';

export const useSortedMT5Accounts = () => {
    const { data: mt5Accounts, ...rest } = useMT5AccountsList();
    const { data: availableMt5Accounts } = useAvailableMT5Accounts();
    const isEUCountry = useIsEuRegion();
    const { data: activeDerivAccount } = useActiveDerivTradingAccount();
    const { uiState } = useUIContext();
    const { regulation } = uiState;

    const isEU = regulation === 'EU' || isEUCountry;

    const modifiedData = useMemo(() => {
        if (!mt5Accounts || !availableMt5Accounts) return;

        const filteredAvailableAccounts = isEU
            ? availableMt5Accounts.filter(account => account.shortcode === 'maltainvest')
            : availableMt5Accounts;

        const filteredMT5Accounts = mt5Accounts.filter(
            account =>
                account.is_virtual === !!activeDerivAccount?.is_virtual &&
                (isEU
                    ? account.landing_company_short === 'maltainvest'
                    : account.landing_company_short !== 'maltainvest')
        );

        return filteredAvailableAccounts.map(availableAccount => {
            const createdAccount = filteredMT5Accounts.find(account => {
                return (
                    availableAccount.market_type === account.market_type &&
                    availableAccount.shortcode === account.landing_company_short
                );
            });

            if (createdAccount)
                return {
                    ...createdAccount,
                    /** Determine if the account is added or not */
                    is_added: true,
                } as const;

            return {
                ...availableAccount,
                /** Determine if the account is added or not */
                is_added: false,
            } as const;
        });
    }, [mt5Accounts, availableMt5Accounts, isEU, activeDerivAccount]);

    /** Reduce out the added and non added accounts to make sure only one of each market_type is shown for not added */
    const filteredData = useMemo(() => {
        if (!modifiedData) return;

        const addedAccounts = modifiedData.filter(account => account.is_added);
        const nonAddedAccounts = modifiedData.filter(account => !account.is_added);

        const filteredNonAddedAccounts = nonAddedAccounts.reduce(
            (acc, account) => {
                const existingAccount = acc.find(accAccount => accAccount.market_type === account.market_type);
                const addedAccount = addedAccounts.find(
                    addedAccount => addedAccount.market_type === account.market_type
                );

                if (existingAccount || addedAccount) return acc;

                return [...acc, account];
            },
            [] as typeof nonAddedAccounts
        );

        return [...addedAccounts, ...filteredNonAddedAccounts];
    }, [modifiedData]);

    /** Sort the accounts by market type */
    const sortedData = useMemo(() => {
        const marketTypeOrder = ['synthetic', 'financial', 'all'] as const;

        if (!filteredData) return;

        const sortedData = marketTypeOrder.reduce(
            (acc, marketType) => {
                const accounts = filteredData.filter(account => account.market_type === marketType);
                if (!accounts.length) return acc;

                return [...acc, ...accounts];
            },
            [] as typeof filteredData
        );

        return sortedData;
    }, [filteredData]);

    return { data: sortedData, ...rest };
};
