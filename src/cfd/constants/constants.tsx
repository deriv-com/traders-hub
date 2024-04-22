import { ComponentType, ReactNode, SVGAttributes } from 'react';

import CTraderLabelIcon from '@/assets/svgs/ctrader-label.svg?react';
import DerivXLabelIcon from '@/assets/svgs/derivx-label.svg?react';
import InstallationAppleIcon from '@/assets/svgs/ic-installation-apple.svg?react';
import InstallationGoogleIcon from '@/assets/svgs/ic-installation-google.svg?react';
import InstallationHuaweiIcon from '@/assets/svgs/ic-installation-huawei.svg?react';
import LinuxIcon from '@/assets/svgs/ic-linux-logo.svg?react';
import MacOSIcon from '@/assets/svgs/ic-macos-logo.svg?react';
import MT5Icon from '@/assets/svgs/ic-mt5.svg?react';
import WindowsIcon from '@/assets/svgs/ic-windows-logo.svg?react';
import { IconComponent } from '@/components';
import { THooks, TJurisdiction, TMarketTypes, TPlatforms } from '@/types';
import { mobileOsDetect } from '@/utils';

import { ctrader_links, dxtrade_links, white_label_links } from './urlConfig';

type TAppContent = {
    description: string;
    icon: ReactNode;
    iconWithWidth?: (width: number) => JSX.Element;
    link: string;
    text: string;
    title: string;
};

type TDesktopLinks =
    | 'ctrader_mac'
    | 'ctrader_web'
    | 'ctrader_windows'
    | 'dxtrade_web'
    | 'mt5_linux'
    | 'mt5_macos'
    | 'mt5_web'
    | 'mt5_windows';

type TAppToContentMapper = {
    [key in TDesktopLinks]: Omit<TAppContent, 'description'>;
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

type TPlatformUrls = {
    [key in TPlatforms.OtherAccounts]: {
        demo?: string;
        live: string;
        staging?: string;
    };
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
        icon: (width?: number, height?: number) => <IconComponent icon='CTrader' width={width} height={height} />,
        link: 'https://onelink.to/5jgj8z',
        platform: 'ctrader' as TPlatforms.OtherAccounts,
        title: 'Deriv cTrader',
    },
    dxtrade: {
        icon: (width?: number, height?: number) => <IconComponent icon='DerivX' width={width} height={height} />,
        link: 'https://onelink.to/grmtyx',
        platform: 'dxtrade' as TPlatforms.OtherAccounts,
        title: 'Deriv X',
    },
    mt5: {
        icon: (width?: number, height?: number) => <IconComponent icon='Derived' width={width} height={height} />,
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
            ? 'CFDs on derived and financial instruments.'
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
        android: ctrader_links.android,
        ios: ctrader_links.ios,
    },
    dxtrade: {
        android: dxtrade_links.android,
        huawei: dxtrade_links.huawei,
        ios: dxtrade_links.ios,
    },
    mt5: {
        android: white_label_links.android,
        huawei: white_label_links.huawei,
        ios: white_label_links.ios,
    },
};

export const PlatformUrls: TPlatformUrls = {
    ctrader: {
        live: ctrader_links.live,
        staging: ctrader_links.staging,
    },
    dxtrade: {
        demo: dxtrade_links.demo,
        live: dxtrade_links.live,
    },
};

export const PlatformToLabelIconMapper: Record<TPlatforms.OtherAccounts, ReactNode> = {
    ctrader: <CTraderLabelIcon />,
    dxtrade: <DerivXLabelIcon />,
};

export const AppToContentMapper: TAppToContentMapper = {
    ctrader_web: {
        icon: '',
        link: '',
        text: 'Open',
        title: 'cTrader web',
    },
    dxtrade_web: {
        icon: '',
        link: '',
        text: 'Open',
        title: 'DerivX web',
    },
    ctrader_windows: {
        icon: <WindowsIcon />,
        link: ctrader_links.windows,
        text: 'Download',
        title: 'cTrader Windows App',
    },
    ctrader_mac: {
        icon: <MacOSIcon />,
        link: ctrader_links.mac,
        text: 'Download',
        title: 'cTrader MacOS App',
    },
    mt5_linux: {
        icon: <LinuxIcon />,
        link: white_label_links.linux,
        text: 'Learn more',
        title: 'MetaTrader 5 Linux app',
    },
    mt5_macos: {
        icon: <MacOSIcon />,
        link: white_label_links.macos,
        text: 'Download',
        title: 'MetaTrader 5 MacOS app',
    },
    mt5_web: {
        icon: <MT5Icon />,
        link: '',
        text: 'Open',
        title: 'MetaTrader 5 web',
    },
    mt5_windows: {
        icon: <WindowsIcon />,
        link: white_label_links.windows,
        text: 'Download',
        title: 'MetaTrader 5 Windows app',
    },
};

export const AppToIconMapper: Record<string, ComponentType<SVGAttributes<SVGElement>>> = {
    android: InstallationGoogleIcon,
    huawei: InstallationHuaweiIcon,
    ios: InstallationAppleIcon,
};

export const getWebtraderUrl = ({ details }: { details: THooks.MT5AccountsList }) => {
    return `${details?.white_label_links?.webtrader_url}?login=${details?.display_login}&server=${details?.server_info?.environment}`;
};

export const getDeeplinkUrl = ({ details }: { details: THooks.MT5AccountsList }) => {
    return `metatrader5://account?login=${details?.display_login}&server=${details?.server_info?.environment}`;
};

export const getMobileAppInstallerUrl = async ({ details }: { details: THooks.MT5AccountsList }) => {
    const os = await mobileOsDetect();
    if (os === 'iOS') {
        return details?.white_label_links?.ios;
    } else if (os === 'huawei') {
        return white_label_links.huawei;
    }
    return details?.white_label_links?.android;
};
