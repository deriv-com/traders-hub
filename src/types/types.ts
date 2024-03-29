import {
    useActiveDerivTradingAccount,
    useAvailableMT5Accounts,
    useCreateOtherCFDAccount,
    useCtraderAccountsList,
    useDerivTradingAccountsList,
    useDxtradeAccountsList,
    useLandingCompany,
    useMT5AccountsList,
    useSettings,
    useSortedMT5Accounts,
} from '@/hooks';

// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace THooks {
    export type MT5AccountsList = NonNullable<ReturnType<typeof useMT5AccountsList>['data']>[0];
    export type DxtradeAccountsList = NonNullable<ReturnType<typeof useDxtradeAccountsList>['data']>[0];
    export type ActiveDerivTradingAccount = NonNullable<ReturnType<typeof useActiveDerivTradingAccount>['data']>;
    export type SortedMT5Accounts = NonNullable<ReturnType<typeof useSortedMT5Accounts>['data']>[number];
    export type DerivTradingAccountsList = NonNullable<ReturnType<typeof useDerivTradingAccountsList>['data']>[0];
    export type LandingCompany = NonNullable<ReturnType<typeof useLandingCompany>['data']>;
    export type Settings = NonNullable<ReturnType<typeof useSettings>['data']>;
    export type AvailableMT5Accounts = NonNullable<ReturnType<typeof useAvailableMT5Accounts>['data']>[0];
    export type CtraderAccountsList = NonNullable<ReturnType<typeof useCtraderAccountsList>['data']>[0];
    export type CreateOtherCFDAccount = NonNullable<ReturnType<typeof useCreateOtherCFDAccount>['data']>;
}

// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace TPlatforms {
    export type MT5 = THooks.AvailableMT5Accounts['platform'];
    export type OtherAccounts = Exclude<THooks.CreateOtherCFDAccount['platform'], 'derivez'>;
    export type SortedMT5Accounts = THooks.SortedMT5Accounts['platform'];
    export type All = MT5 | OtherAccounts | SortedMT5Accounts;
}

// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace TMarketTypes {
    export type All = CreateOtherCFDAccount | SortedMT5Accounts;
    export type CreateOtherCFDAccount = Exclude<THooks.CreateOtherCFDAccount['market_type'], undefined>;
    export type SortedMT5Accounts = Exclude<THooks.SortedMT5Accounts['market_type'], undefined>;
}

export type TJurisdiction = THooks.MT5AccountsList['landing_company_short'];
export type TMT5LandingCompanyName = THooks.MT5AccountsList['landing_company_short'];
export type TLandingCompanyName = Extract<THooks.MT5AccountsList['landing_company_short'], 'malta' | 'svg'> | 'virtual';
