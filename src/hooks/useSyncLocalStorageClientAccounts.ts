import { useCallback } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

import { useNewAccountReal } from '@deriv-com/api-hooks';

import { useActiveDerivTradingAccount, useSettings } from '.';

type TNewTradingAccount = NonNullable<ReturnType<typeof useNewAccountReal>['data']>;

/**
 * @name useSyncLocalStorageClientAccounts
 * @description A custom hook that syncs the client accounts to the local storage
 * @returns { addTradingAccountToLocalStorage: (newAccount: TNewTradingAccount) => void }
 */
export const useSyncLocalStorageClientAccounts = () => {
    const { data: activeDerivTradingAccount } = useActiveDerivTradingAccount();
    const { data: settingsData } = useSettings();
    const accountsList = useReadLocalStorage('client.account_list') as Record<string, object>;
    const [, setLocalStorageClientAccounts] = useLocalStorage('client.account_list', accountsList ?? {});

    const addTradingAccountToLocalStorage = useCallback(
        (newAccount: TNewTradingAccount) => {
            if (newAccount && activeDerivTradingAccount) {
                const dataToStore = {
                    accepted_bch: 0,
                    account_category: activeDerivTradingAccount.account_category,
                    account_type: activeDerivTradingAccount.account_type,
                    balance: 0,
                    created_at: activeDerivTradingAccount.created_at,
                    currency: newAccount.currency,
                    email: settingsData.email,
                    is_disabled: Number(activeDerivTradingAccount.is_disabled),
                    is_virtual: Number(activeDerivTradingAccount.is_virtual),
                    landing_company_name: newAccount.landing_company_shortcode,
                    landing_company_shortcode: newAccount.landing_company_shortcode,
                    residence: settingsData.citizen ?? settingsData.country_code,
                    session_start: new Date().valueOf() / 1000,
                    token: newAccount.oauth_token,
                };

                const clientAccounts = accountsList ?? {};
                const localStorageData = {
                    ...clientAccounts,
                    [newAccount.client_id]: dataToStore,
                    [activeDerivTradingAccount.loginid]: {
                        ...clientAccounts[activeDerivTradingAccount.loginid],
                        linked_to: [{ loginid: newAccount.client_id, platform: 'dtrade' }],
                    },
                };
                setLocalStorageClientAccounts(localStorageData);
            }
        },
        [
            accountsList,
            activeDerivTradingAccount,
            setLocalStorageClientAccounts,
            settingsData.citizen,
            settingsData.country_code,
            settingsData.email,
        ]
    );

    return { addTradingAccountToLocalStorage };
};
