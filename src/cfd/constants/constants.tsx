import { ReactNode } from 'react';

import { IconComponent } from '@/components';
import { TJurisdiction, TMarketTypes, TPlatforms } from '@/types';

type TAppContent = {
    description: string;
    icon: ReactNode;
    iconWithWidth?: (width: number) => JSX.Element;
    link: string;
    text: string;
    title: string;
};

export type TAppLinks = {
    android: string;
    huawei?: string;
    ios: string;
};

type TMarketTypeDetails = {
    [key in TMarketTypes.All]: Pick<TAppContent, 'description' | 'icon' | 'iconWithWidth' | 'title'>;
};

export type TTM5FilterLandingCompany = Exclude<TJurisdiction, 'malta' | 'seychelles' | undefined>;
type TLandingCompanyDetails = { name: string; shortcode: string; tncUrl: string };

type TcompanyNamesAndUrls = {
    [key in TTM5FilterLandingCompany]: TLandingCompanyDetails;
};

export const CFDPlatforms = {
    CFDS: 'CFDs',
    CTRADER: 'ctrader',
    DXTRADE: 'dxtrade',
    MT5: 'mt5',
} as const;

export const DesktopLinks = {
    CTRADER_WINDOWS: 'ctrader_windows',
    CTRADER_MAC: 'ctrader_mac',
    CTRADER_WEB: 'ctrader_web',
    MT5_LINUX: 'mt5_linux',
    MT5_MACOS: 'mt5_macos',
    MT5_WEB: 'mt5_web',
    MT5_WINDOWS: 'mt5_windows',
    DXTRADE_WEB: 'dxtrade_web',
} as const;

export const MarketType = {
    ALL: 'all',
    FINANCIAL: 'financial',
    SYNTHETIC: 'synthetic',
} as const;

export const Category = {
    DEMO: 'demo',
    REAL: 'real',
} as const;

export const QueryStatus = {
    ERROR: 'error',
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
} as const;

export const Jurisdiction = {
    BVI: 'bvi',
    LABUAN: 'labuan',
    MALTAINVEST: 'maltainvest',
    SVG: 'svg',
    VANUATU: 'vanuatu',
} as const;

export const PlatformDetails = {
    ctrader: {
        icon: (width?: number) => <IconComponent icon='CTrader' width={width} />,
        link: 'https://onelink.to/5jgj8z',
        platform: 'ctrader' as TPlatforms.OtherAccounts,
        title: 'Deriv cTrader',
    },
    dxtrade: {
        icon: (width?: number) => <IconComponent icon='DerivX' width={width} />,
        link: 'https://onelink.to/grmtyx',
        platform: 'dxtrade' as TPlatforms.OtherAccounts,
        title: 'Deriv X',
    },
    mt5: {
        icon: (width?: number) => <IconComponent icon='Derived' width={width} />,
        link: 'https://onelink.to/grmtyx',
        platform: 'mt5' as TPlatforms.MT5,
        title: 'Deriv MT5',
    },
};

export const MarketTypeDetails = (isEU?: boolean): TMarketTypeDetails => ({
    all: {
        description:
            'Trade swap-free CFDs on MT5 with forex, stocks, stock indices, commodities, cryptocurrencies, ETFs and synthetic indices.',
        icon: <IconComponent icon='SwapFree' />,
        iconWithWidth: (width: number) => <IconComponent icon='SwapFree' width={width} />,
        title: 'Swap-Free',
    },
    financial: {
        description: isEU
            ? 'This MFSA-regulated account offers CFDs on derived and financial instruments.'
            : 'This account offers CFDs on financial instruments.',
        icon: <IconComponent icon={isEU ? 'CFDs' : 'Financial'} />,
        iconWithWidth: (width: number) => <IconComponent icon={isEU ? 'CFDs' : 'Financial'} width={width} />,
        title: isEU ? 'CFDs' : 'Financial',
    },
    synthetic: {
        description: 'This account offers CFDs on derived instruments.',
        icon: <IconComponent icon='Derived' />,
        iconWithWidth: (width: number) => <IconComponent icon='Derived' width={width} />,
        title: 'Derived',
    },
});

export const companyNamesAndUrls: TcompanyNamesAndUrls = {
    bvi: { name: 'Deriv (BVI) Ltd', shortcode: 'BVI', tncUrl: 'tnc/deriv-(bvi)-ltd.pdf' },
    labuan: { name: 'Deriv (FX) Ltd', shortcode: 'Labuan', tncUrl: 'tnc/deriv-(fx)-ltd.pdf' },
    maltainvest: {
        name: 'Deriv Investments (Europe) Limited',
        shortcode: 'Maltainvest',
        tncUrl: 'tnc/deriv-investments-(europe)-limited.pdf',
    },
    svg: { name: 'Deriv (SVG) LLC', shortcode: 'SVG', tncUrl: 'tnc/deriv-(svg)-llc.pdf' },
    vanuatu: { name: 'Deriv (V) Ltd', shortcode: 'Vanuatu', tncUrl: 'tnc/general-terms.pdf' },
};

export const LinksMapper: Record<TPlatforms.All, TAppLinks> = {
    ctrader: {
        android: 'https://play.google.com/store/apps/details?id=com.deriv.ct',
        ios: 'https://apps.apple.com/us/app/deriv-ctrader/id6466996509',
    },
    dxtrade: {
        android: 'https://play.google.com/store/apps/details?id=com.deriv.dx',
        huawei: 'https://appgallery.huawei.com/app/C104633219',
        ios: 'https://apps.apple.com/us/app/deriv-x/id1563337503',
    },
    mt5: {
        android: 'https://download.mql5.com/cdn/mobile/mt5/android?server=Deriv-Demo,Deriv-Server,Deriv-Server-02',
        huawei: 'https://appgallery.huawei.com/#/app/C102015329',
        ios: 'https://download.mql5.com/cdn/mobile/mt5/ios?server=Deriv-Demo,Deriv-Server,Deriv-Server-02',
    },
};
