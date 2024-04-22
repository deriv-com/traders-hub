import { CSSProperties, ElementType } from 'react';

import {
    AccountsDerivAccountLightIcon,
    AccountsDmt5CfdsIcon,
    AccountsDmt5DerivedIcon,
    AccountsDmt5FinancialIcon,
    AccountsDmt5SwfIcon,
    BrandDerivWordmarkCoralIcon,
    CurrencyAudIcon,
    CurrencyBtcIcon,
    CurrencyDemoIcon,
    CurrencyEthIcon,
    CurrencyEurIcon,
    CurrencyGbpIcon,
    CurrencyLtcIcon,
    CurrencyUsdcIcon,
    CurrencyUsdIcon,
    CurrencyUsdtIcon,
    DerivProductDerivBotBrandLightLogoHorizontalIcon,
    DerivProductDerivGoBrandLightLogoHorizontalIcon,
    DerivProductDerivTraderBrandLightLogoHorizontalIcon,
    DerivProductDerivXBrandLightLogoIcon,
    LabelPairedChevronRightXlFillIcon,
    LabelPairedLaptopLgFillIcon,
    LabelPairedMobileNotchLgBoldIcon,
    PartnersProductBinaryBotBrandLightLogoHorizontalIcon,
    PartnersProductDerivCtraderBrandLightLogoHorizontalIcon,
    PartnersProductSmarttraderBrandLightLogoIcon,
} from '@deriv/quill-icons';

import ImportantIcon from '@/assets/svgs/ic-important.svg?react';

interface IconProps<T> {
    className?: string;
    height?: CSSProperties['height'];
    icon: T;
    onClick?: () => void;
    width?: CSSProperties['width'];
}

export const Icons: Record<string, ElementType> = {
    Deriv: BrandDerivWordmarkCoralIcon,
    BinaryBot: PartnersProductBinaryBotBrandLightLogoHorizontalIcon,
    CFDs: AccountsDmt5CfdsIcon,
    CTrader: PartnersProductDerivCtraderBrandLightLogoHorizontalIcon,
    DBot: DerivProductDerivBotBrandLightLogoHorizontalIcon,
    DerivApps: AccountsDerivAccountLightIcon,
    Derived: AccountsDmt5DerivedIcon,
    DerivGo: DerivProductDerivGoBrandLightLogoHorizontalIcon,
    DerivX: DerivProductDerivXBrandLightLogoIcon,
    DTrader: DerivProductDerivTraderBrandLightLogoHorizontalIcon,
    Financial: AccountsDmt5FinancialIcon,
    SmartTrader: PartnersProductSmarttraderBrandLightLogoIcon,
    SwapFree: AccountsDmt5SwfIcon,
    AUD: CurrencyAudIcon,
    BTC: CurrencyBtcIcon,
    ETH: CurrencyEthIcon,
    EUR: CurrencyEurIcon,
    eUSDT: CurrencyUsdtIcon,
    GBP: CurrencyGbpIcon,
    LTC: CurrencyLtcIcon,
    tUSDT: CurrencyUsdtIcon,
    USD: CurrencyUsdIcon,
    USDC: CurrencyUsdcIcon,
    UST: CurrencyUsdtIcon,
    virtual: CurrencyDemoIcon,
    ImportantIcon,
    ArrowRight: LabelPairedChevronRightXlFillIcon,
    Laptop: LabelPairedLaptopLgFillIcon,
    Mobile: LabelPairedMobileNotchLgBoldIcon,
};

export const IconComponent = ({ className, height = 48, icon, onClick, width = 48 }: IconProps<keyof typeof Icons>) => {
    const Icon = Icons[icon] as ElementType;

    return Icon ? <Icon className={className} height={height} onClick={onClick} width={width} /> : null;
};
